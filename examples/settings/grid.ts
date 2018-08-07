import { Terminal } from '../../src/Terminal';
import { Widget, WidgetOptions } from '../../src/Widget';
import { Box } from '../../src/widgets/Box';
import { Grid, GridOptions } from '../../src/widgets/Grid';
import { LoadData, load } from '../util/load';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingNumber } from './controls/SettingNumber';
import { SettingButton } from './controls/SettingsButton';
import { SettingsPage } from './controls/SettingsPage';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsRow, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

let page: SettingsPage<GridOptions>;
let pageTerminal: Terminal;
let pageSettings: WidgetSettings;
let pageSettingRows: SettingsRow[] = [];
let pageSettingsRowId = 1;
let widgetSettings: WidgetSettings;

const pageSettingsLayout: SettingsLayout = {
  title: 'Demo options',
  sections: [{
    rows: pageSettingRows,
  }],
};

const gridSettingsSection: SettingsSection = {
  rows: [
    {
      cols: [
        {
          title: 'Columns',
          contents: [
            new SettingNumber({ name: 'columns', min: 1 }),
          ],
        },
        {
          title: 'Rows',
          contents: [
            new SettingNumber({ name: 'rows', min: 1 }),
          ],
        },
        {
          title: 'Full Size',
          contents: [
            new SettingBoolean({ name: 'fullSize' }),
          ],
        },
      ],
    },
  ],
};

/**
 * Get a SettingRow for the Page Widget Settings box
 */
function getWidgetSettingsRow(): SettingsRow {
  function removeRow() {
    pageSettingRows = pageSettingRows.filter((item) => item.id !== id);
    pageSettingsLayout.sections[0].rows = pageSettingRows;
    pageSettings.setSections(pageSettingsLayout.sections);
    updatePageSettings(pageSettings);
  }

  const n = pageSettingsRowId++;
  const id = `pageSettingsRow${n}`;
  const row: SettingsRow = {
    id,
    cols: [
      {
        contents: [
          'Column: ',
          new SettingNumber({ name: `col-${n}`, min: 0 }),
        ],
      },
      {
        contents: [
          'Row: ',
          new SettingNumber({ name: `line-${n}`, min: 0 }),
        ],
      },
      {
        contents: [
          'Width: ',
          new SettingNumber({ name: `width-${n}`, min: 1 }),
        ],
      },
      {
        contents: [
          'Height: ',
          new SettingNumber({ name: `height-${n}`, min: 1 }),
        ],
      },
      {
        contents: [
          new SettingButton({ text: `Remove ${n}`, callback: removeRow }),
        ],
      },
    ],
  };

  return row;
}

function addBox(): void {
  const newRow = getWidgetSettingsRow();
  pageSettingRows.push(newRow);
  pageSettings.setSections(pageSettingsLayout.sections);
}

/**
 * Create the widget to test
 */
function createWidget(terminal: Terminal, options: WidgetOptions): Widget {
  const gridWidget = terminal.attachWidget(Grid, options);

  return gridWidget;
}

/**
 * Create the WidgetSettings object for the widget settings card
 */
function createWidgetSettings() {
  const settingsLayout: SettingsLayout = {
    title: 'Grid options',
    sections: [
      basicSection,
      gridSettingsSection,
    ],
  };

  widgetSettings = new WidgetSettings(settingsLayout);

  return widgetSettings;
}

/**
 * Listen to changes on the Demo settings and apply it to the widgets
 */
function updatePageSettings(pSettings: WidgetSettings) {
  interface DemoConfig {
    show: boolean;
    text: string;
  }

  if (!page) {
    return;
  }

  const config: DemoConfig = pSettings.getConfig(['']) as DemoConfig;

  /*
   * Transform the config object into an array of configs
   */
  const boxes = {};
  const MATCH_PROP = 1;
  const MATCH_ID = 2;
  Object.keys(config)
    .forEach((key) => {
      const match = /([^-]+)-([0-9]+)/.exec(key);
      if (!boxes[match[MATCH_ID]]) {
        boxes[match[MATCH_ID]] = {};
      }
      boxes[match[MATCH_ID]][match[MATCH_PROP]] = config[key];
    });

  /*
   * Reset the grid
   */
  const widgetOptions: GridOptions = widgetSettings.getConfig(['']) as GridOptions;
  const gridWidget: Grid = createWidget(pageTerminal, widgetOptions) as Grid;
  page.updateWidget(gridWidget, widgetOptions);

  /*
   * Create boxes in the grid
   */
  Object.keys(boxes)
    .forEach((key) => {
      const boxConfig = boxes[key];
      if (boxConfig.col === undefined || boxConfig.line === undefined
        || boxConfig.width === undefined || boxConfig.height === undefined) {
        return;
      }

      gridWidget.attachWidget(
        boxConfig.col,
        boxConfig.line,
        boxConfig.width,
        boxConfig.height,
        Box,
        { title: key },
      );
    });
}

/**
 *
 */
function createPageSettings(): WidgetSettings {
  pageSettings = new WidgetSettings(pageSettingsLayout, {
    button: {
      text: 'Add new widget',
      callback: addBox,
    },
  });

  pageSettings.onChange = updatePageSettings;
  updatePageSettings(pageSettings);

  return pageSettings;
}

/**
 *
 */
function filterCode(code: GridOptions): GridOptions {
  if (code.fullSize) {
    delete code.width;
    delete code.height;
  }

  return code;
}

function preUpdateWidgeSettings(): boolean {
  updatePageSettings(pageSettings);

  return false;
}

const widgetInitialSettings = {
  ...Widget.defaultOptions,
  col: 1,
  line: 1,
  width: 40,
  height: 20,
  rows: 4,
  columns: 4,
  fullSize: true,
};

/*
 * Execution
 */
load()
  .then(({ terminal }: LoadData) => {
    pageTerminal = terminal;
    page = new SettingsPage<GridOptions>({
      terminal,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...Grid.defaultOptions },
      widgetInitialSettings,
      createPageSettings,
      createWidget,
      createWidgetSettings,
      filterCode,
      preUpdateWidgeSettings,
    });
  });
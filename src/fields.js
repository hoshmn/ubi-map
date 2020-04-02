const SHEET_FIELDS = {
  LONGITUDE: {
    displayName: 'Longitude',
    sheetName: 'longitude'
  },
  LATITUDE: {
    displayName: 'Latitude',
    sheetName: 'latitude'
  },
  // NOTE: Used to bind the different locations of a given experiment together.
  // We use it as the mapbox ID for the feature to simplify unified hover/selection styling.
  EID: {
    displayName: 'Experiment ID',
    sheetName: 'eid'
  },
  NAME: {
    displayName: 'Name of Experiment',
    sheetName: 'name'
  },
  TYPE: {
    displayName: 'Past, Ongoing, Proposed',
    sheetName: 'type'
  },
  LOCATION: {
    displayName: 'Location',
    sheetName: 'location'
  },
  DATES: {
    displayName: 'Implementation Dates',
    sheetName: 'dates'
  },
  RECIPIENTS: {
    displayName: 'Number of Recipients',
    sheetName: 'recipients'
  },
  IMPLEMENTER: {
    displayName: 'Implementing Agency',
    sheetName: 'implementer',
    isExpandible: true
  },
  RESEARCHER: {
    displayName: 'Research Agency',
    sheetName: 'researcher',
    isExpandible: true
  },
  FUNDER: {
    displayName: 'Funding Agency',
    sheetName: 'funder',
    isExpandible: true
  },
  TARGETING: {
    displayName: 'Type of Targeting',
    sheetName: 'targeting',
    isExpandible: true
  },
  UNIT: {
    displayName: 'Unit of Recipient',
    sheetName: 'unit'
  },
  AMOUNT: {
    displayName: 'Amount of Transfer',
    sheetName: 'amount',
    isExpandible: true
  },
  FREQUENCY: {
    displayName: 'Frequency of Payment',
    sheetName: 'frequency'
  },
  EVALUATION: {
    displayName: 'Method of Evaluation',
    sheetName: 'evaluation'
  },
  NOTES: {
    displayName: 'Additional Notes of Interest',
    sheetName: 'notes',
    isExpandible: true
  },
  WEBSITE: {
    displayName: 'Link to Website',
    sheetName: 'website',
    forceUniformValue: true
  },
  LINKURL1: {
    displayName: 'Link to Related Resource 1',
    sheetName: 'linkurl1'
  },
  LINKTITLE1: {
    displayName: 'Link title 1',
    sheetName: 'linktitle1'
  },
  LINKURL2: {
    displayName: 'Link to Related Resource 2',
    sheetName: 'linkurl2'
  },
  LINKTITLE2: {
    displayName: 'Link title 2',
    sheetName: 'linktitle2'
  },
  LINKURL3: {
    displayName: 'Link to Related Resource 3',
    sheetName: 'linkurl3'
  },
  LINKTITLE3: {
    displayName: 'Link title 3',
    sheetName: 'linktitle3'
  },
  LINKURL4: {
    displayName: 'Link to Related Resource 4',
    sheetName: 'linkurl4'
  },
  LINKTITLE4: {
    displayName: 'Link title 4',
    sheetName: 'linktitle4'
  },
  LINKURL5: {
    displayName: 'Link to Related Resource 5',
    sheetName: 'linkurl5'
  },
  LINKTITLE5: {
    displayName: 'Link title 5',
    sheetName: 'linktitle5'
  },
  LINKURL6: {
    displayName: 'Link to Related Resource 6',
    sheetName: 'linkurl6'
  },
  LINKTITLE6: {
    displayName: 'Link title 6',
    sheetName: 'linktitle6'
  }
};

const LINK_FIELD_PAIRS = [
  { urlField: SHEET_FIELDS.LINKURL1, titleField: SHEET_FIELDS.LINKTITLE1 },
  { urlField: SHEET_FIELDS.LINKURL2, titleField: SHEET_FIELDS.LINKTITLE2 },
  { urlField: SHEET_FIELDS.LINKURL3, titleField: SHEET_FIELDS.LINKTITLE3 },
  { urlField: SHEET_FIELDS.LINKURL4, titleField: SHEET_FIELDS.LINKTITLE4 },
  { urlField: SHEET_FIELDS.LINKURL5, titleField: SHEET_FIELDS.LINKTITLE5 },
  { urlField: SHEET_FIELDS.LINKURL6, titleField: SHEET_FIELDS.LINKTITLE6 },
];

const FEATURE_HEADERS = {
  ORGANIZATIONAL: {
    displayName: 'ORGANIZATIONAL FEATURES',
    sheetName: null,
    isFeatureHeader: true
  },
  IMPLEMENTATION: {
    displayName: 'IMPLEMENTATION FEATURES',
    sheetName: null,
    isFeatureHeader: true
  },
};

const COMPOSITE_FIELDS = {
  RELATED_RESOURCES: {
    displayName: 'Links to Related Resources',
    sheetName: null,
    isExpandible: true,
    // composite: true
  }
};

const ORDERED_CARD_FIELDS = [
  // SHEET_FIELDS.LONGITUDE,
  // SHEET_FIELDS.LATITUDE,
  // SHEET_FIELDS.EID,
  // SHEET_FIELDS.NAME,
  // SHEET_FIELDS.TYPE,
  SHEET_FIELDS.LOCATION,
  SHEET_FIELDS.DATES,
  SHEET_FIELDS.RECIPIENTS,
  FEATURE_HEADERS.ORGANIZATIONAL,
  SHEET_FIELDS.IMPLEMENTER,
  SHEET_FIELDS.RESEARCHER,
  SHEET_FIELDS.FUNDER,
  FEATURE_HEADERS.IMPLEMENTATION,
  SHEET_FIELDS.TARGETING,
  SHEET_FIELDS.UNIT,
  SHEET_FIELDS.AMOUNT,
  SHEET_FIELDS.FREQUENCY,
  SHEET_FIELDS.EVALUATION,
  SHEET_FIELDS.NOTES,
  SHEET_FIELDS.WEBSITE,
  COMPOSITE_FIELDS.RELATED_RESOURCES
  // SHEET_FIELDS.LINKURL1,
  // SHEET_FIELDS.LINKTITLE1,
  // SHEET_FIELDS.LINKURL2,
  // SHEET_FIELDS.LINKTITLE2,
  // SHEET_FIELDS.LINKURL3,
  // SHEET_FIELDS.LINKTITLE3,
  // SHEET_FIELDS.LINKURL4,
  // SHEET_FIELDS.LINKTITLE4,
  // SHEET_FIELDS.LINKURL5,
  // SHEET_FIELDS.LINKTITLE5,
  // SHEET_FIELDS.LINKURL6,
  // SHEET_FIELDS.LINKTITLE6
];

export { SHEET_FIELDS, FEATURE_HEADERS, COMPOSITE_FIELDS, ORDERED_CARD_FIELDS, LINK_FIELD_PAIRS };
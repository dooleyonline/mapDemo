// src/data/places.ts
export const PLACES: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: 'FeatureCollection',
  features: [
    // Clairmont
    {
      type: 'Feature',
      id: 'clairmont-1',
      properties: { name: 'Clairmont Meetup Spot 1', desc: '', zone: 'clairmont'},        
      geometry: { type: 'Point', coordinates: [
          -84.30758339023363,
          33.7979389018721
        ] },
    },
    {
      type: 'Feature',
      id: 'clairmont-2',
      properties: { name: 'Clairmont Meetup Spot 2', desc: '', zone: 'clairmont' },         
      geometry: { type: 'Point', coordinates: [
          -84.3097357292855,
          33.797584636698375
        ] },
    },
    {
      type: 'Feature',
      id: 'clairmont-3',
      properties: { name: 'Clairmont Meetup Spot 3', desc: '', zone: 'clairmont' },         
      geometry: { type: 'Point', coordinates: [
          -84.30940300054343,
          33.79685882054349
        ] },
    },
    // Hospital
    {
      type: 'Feature',
      id: 'hospital-1',
      properties: { name: 'Hospital Meetup Spot 1', desc: '', zone: 'hospital' },         
      geometry: { type: 'Point', coordinates: [
          -84.32071276237612,
          33.79002476450512
        ] },
    },
    {
      type: 'Feature',
      id: 'hospital-2',
      properties: { name: 'Hospital Meetup Spot 2', desc: '', zone: 'hospital' },         
      geometry: { type: 'Point', coordinates: [
          -84.31822462195069,
          33.79434304340329
        ] },
    },
    {
      type: 'Feature',
      id: 'hospital-3',
      properties: { name: 'Hospital Meetup Spot 3', desc: '', zone: 'hospital' },         
      geometry: { type: 'Point', coordinates: [
          -84.31946318700648,
          33.78992911325254
        ] },
    },
    // WOODRUFF
    {
      type: 'Feature',
      id: 'woodruff-1',
      properties: { name: 'Woodruff Meetup Spot 1', desc: '', zone: 'woodruff' },         
      geometry: { type: 'Point', coordinates: [
          -84.32395076719719,
          33.79778124723815
        ] },
    },
    {
      type: 'Feature',
      id: 'woodruff-2',
      properties: { name: 'Woodruff Meetup Spot 2', desc: '', zone: 'woodruff' },         
      geometry: { type: 'Point', coordinates: [
          -84.32367152368099,
          33.79726725654231
        ] },
    },
    {
      type: 'Feature',
      id: 'woodruff-3',
      properties: { name: 'Woodruff Meetup Spot 3', desc: '', zone: 'woodruff' },         
      geometry: { type: 'Point', coordinates: [
          -84.32128879895293,
          33.79717126556466
        ] },
    },
    {
      type: 'Feature',
      id: 'woodruff-4',
      properties: { name: 'Woodruff Meetup Spot 4', desc: '', zone: 'woodruff' },         
      geometry: { type: 'Point', coordinates: [
          -84.32296207297094,
          33.79643425694958
        ] },
    },
    {
      type: 'Feature',
      id: 'woodruff-5',
      properties: { name: 'Woodruff Meetup Spot 5', desc: '', zone: 'woodruff' },         
      geometry: { type: 'Point', coordinates: [
          -84.32145857410589,
          33.79613202731056
        ] },
    },
    // MAIN
    {
      type: 'Feature',
      id: 'main-1',
      properties: { name: 'Main Meetup Spot 1', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.3263142376021,
          33.79544237870114
        ] },
    },
    {
      type: 'Feature',
      id: 'main-2',
      properties: { name: 'Main Meetup Spot 2', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32332897230621,
          33.7946895701984
        ] },
    },
    {
      type: 'Feature',
      id: 'main-3',
      properties: { name: 'Main Meetup Spot 3', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32364885828991,
          33.794453270515504
        ] },
    },
    {
      type: 'Feature',
      id: 'main-4',
      properties: { name: 'Main Meetup Spot 4', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32311330747956,
          33.794328525682815
        ] },
    },
    {
      type: 'Feature',
      id: 'main-5',
      properties: { name: 'Main Meetup Spot 5', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32324575047133,
          33.79396112138329
        ] },
    },
    {
      type: 'Feature',
      id: 'main-6',
      properties: { name: 'Main Meetup Spot 6', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32735578562819,
          33.794314752444805
        ] },
    },
    {
      type: 'Feature',
      id: 'main-7',
      properties: { name: 'Main Meetup Spot 7', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.3255936993652,
          33.79438428542389
        ] },
    },
    {
      type: 'Feature',
      id: 'main-8',
      properties: { name: 'Main Meetup Spot 8', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32479712882763,
          33.79451129998202
        ] },
    },
    {
      type: 'Feature',
      id: 'main-9',
      properties: { name: 'Main Meetup Spot 9', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32441776688647,
          33.79418125724462
        ] },
    },
    {
      type: 'Feature',
      id: 'main-10',
      properties: { name: 'Main Meetup Spot 10', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32387650050565,
          33.79350562574632
        ] },
    },
    {
      type: 'Feature',
      id: 'main-11',
      properties: { name: 'Main Meetup Spot 11', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.3217197868817,
          33.79341722980715
        ] },
    },
    {
      type: 'Feature',
      id: 'main-12',
      properties: { name: 'Main Meetup Spot 12', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32693905000706,
          33.79144512394825
        ] },
    },
    {
      type: 'Feature',
      id: 'main-13',
      properties: { name: 'Main Meetup Spot 13', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32640406531442,
          33.79164144431627
        ] },
    },
    {
      type: 'Feature',
      id: 'main-14',
      properties: { name: 'Main Meetup Spot 14', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32449551228213,
          33.791950907067545
        ] },
    },
    {
      type: 'Feature',
      id: 'main-15',
      properties: { name: 'Main Meetup Spot 15', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32422628131539,
          33.792778604080866
        ] },
    },
    {
      type: 'Feature',
      id: 'main-16',
      properties: { name: 'Main Meetup Spot 16', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32356111857143,
          33.79251728640729
        ] },
    },
    {
      type: 'Feature',
      id: 'main-17',
      properties: { name: 'Main Meetup Spot 17', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32640824850043,
          33.79086499746883
        ] },
    },
    {
      type: 'Feature',
      id: 'main-18',
      properties: { name: 'Main Meetup Spot 18', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32481182213093,
          33.79120723536249
        ] },
    },
    {
      type: 'Feature',
      id: 'main-19',
      properties: { name: 'Main Meetup Spot 19', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32368369914711,
          33.79174253516804
        ] },
    },
    {
      type: 'Feature',
      id: 'main-20',
      properties: { name: 'Main Meetup Spot 20', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32253131432594,
          33.79027549025551
        ] },
    },
    {
      type: 'Feature',
      id: 'main-21',
      properties: { name: 'Main Meetup Spot 21', desc: '', zone: 'main' },         
      geometry: { type: 'Point', coordinates: [
          -84.32152575606773,
          33.79031376685161
        ] },
    },
  ],
};

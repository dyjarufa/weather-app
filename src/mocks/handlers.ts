import { http, HttpResponse } from 'msw'

const GEO_URL =
  'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress*'
const NWS_POINTS = 'https://api.weather.gov/points/:lat,:lon'
const NWS_FORECAST =
  'https://api.weather.gov/gridpoints/:office/:gridX/:gridY/forecast'

export const handlers = [
  http.get(GEO_URL, () => {
    return HttpResponse.json({
      result: {
        addressMatches: [
          {
            /* San Francisco */
            coordinates: { x: -122.4194, y: 37.7749 },
            tigerLine: {
              side: 'L',
              tigerLineId: '635274313',
            },
            addressComponents: {
              zip: '94105',
              streetName: 'MARKET',
              preType: '',
              city: 'SAN FRANCISCO',
              preDirection: '',
              suffixDirection: '',
              fromAddress: '1',
              state: 'CA',
              suffixType: 'ST',
              toAddress: '99',
              suffixQualifier: '',
              preQualifier: '',
            },
          },
        ],
      },
    })
  }),

  // Points ------------------------------------------------------------------
  http.get(NWS_POINTS, () => {
    return HttpResponse.json({
      properties: {
        forecast: 'https://api.weather.gov/gridpoints/MTR/84,105/forecast',
        forecastHourly:
          'https://api.weather.gov/gridpoints/MTR/84,105/forecast/hourly',
        forecastGridData: 'https://api.weather.gov/gridpoints/MTR/84,105',
        observationStations:
          'https://api.weather.gov/gridpoints/MTR/84,105/stations',
        relativeLocation: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.4194, 37.7749],
          },
          properties: {
            city: 'San Francisco',
            state: 'CA',
            distance: {
              value: 0,
              unitCode: 'unit:m',
            },
          },
        },
        forecastOffice: 'https://api.weather.gov/offices/MTR',
        gridId: 'MTR',
        gridX: 84,
        gridY: 105,
      },
    })
  }),

  // Forecast ----------------------------------------------------------------
  http.get(NWS_FORECAST, () => {
    return HttpResponse.json({
      properties: {
        updated: new Date().toISOString(),
        units: 'us',
        forecastGenerator: 'BaselineForecastGenerator',
        generatedAt: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        periods: [
          {
            number: 1,
            name: 'Today',
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
            isDaytime: true,
            temperature: 68,
            temperatureUnit: 'F',
            temperatureTrend: null,
            windSpeed: '10 mph',
            windDirection: 'W',
            icon: 'https://api.weather.gov/icons/land/day/sct?size=medium',
            shortForecast: 'Partly Cloudy',
            detailedForecast:
              'Partly cloudy, with a high near 68. West wind around 10 mph.',
          },
          {
            number: 2,
            name: 'Tonight',
            startTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            isDaytime: false,
            temperature: 55,
            temperatureUnit: 'F',
            temperatureTrend: null,
            windSpeed: '5 mph',
            windDirection: 'W',
            icon: 'https://api.weather.gov/icons/land/night/few?size=medium',
            shortForecast: 'Mostly Clear',
            detailedForecast:
              'Mostly clear, with a low around 55. West wind around 5 mph.',
          },
        ],
      },
    })
  }),
]

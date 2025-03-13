// lightgrid styling
export const lightGrid_options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: ' #27272a',
        display: false,
      },
    },
    y: {
      grid: {
        color: ' #27272a',
        display: false,
      },
    },
  },
}
//darkgrid styling
export const darkGrid_options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: ' #ffffff',
        display: false,
      },
    },
    y: {
      grid: {
        color: ' #ffffff',
        display: false,
      },
    },
  },
}

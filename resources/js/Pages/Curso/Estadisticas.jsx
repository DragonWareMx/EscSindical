import Layout from '../../layouts/Layout';
import LayoutCursos from '../../layouts/LayoutCursos';
import React, { useEffect } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

import { Pie, Line, Bar } from 'react-chartjs-2';

const data = {
  labels: ['Médica', 'Administrativa ', 'Desarrollo personal', 'Escuela sindical'],
  datasets: [
    {
      label: 'CATEGORÍAS',
      data: [12, 19, 3, 5],
      backgroundColor: [
        '#81B2D6',
        '#FFF06B',
        '#FF935A',
        '#108058',
      ],
      borderColor: [
        '#81B2D6',
        '#FFF06B',
        '#FF935A',
        '#108058',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: 'CATEGORÍAS',
      position: 'bottom',
      font: {
        family: "Montserrat",
        size: 13,
        weight: "500"
      }
    },
    legend: {
      position: "right",
    }
  },
  maintainAspectRatio: false
};

const data2 = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
  datasets: [
    {
      label: 'Hombres',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: '#108058',
      borderColor: '#108058',
    },
    {
      label: 'Mujeres',
      data: [3, 11, 4, 8, 1, 5],
      fill: false,
      backgroundColor: '#F1B0D8',
      borderColor: '#F1B0D8',
    },

  ],
};

const options2 = {
  scales: {
    yAxes:
    {
      title: {
        display: true,
        text: 'Inscripciones'
      },
      ticks: {
        beginAtZero: true,
      },
    },
    xAxes: {
      title: {
        display: true,
        text: 'Tiempo'
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'TOTAL DE DESERCIONES',
      position: 'bottom',
      font: {
        family: "Montserrat",
        size: 13,
        weight: "500"
      }
    },
    legend: {
      position: "right",
    }
  },
  maintainAspectRatio: false
};

const data3 = {
  labels: ['Aprobados', 'Reprobados'],
  datasets: [
    {
      label: 'CATEGORÍAS',
      data: [12, 19],
      backgroundColor: [
        '#81B2D6',
        '#FF935A',
      ],
      borderColor: [
        '#81B2D6',
        '#FF935A',
      ],
      borderWidth: 1,
    },
  ],
};

const options3 = {
  plugins: {
    title: {
      display: true,
      text: 'ÍNDICE DE APROBACIÓN',
      position: 'bottom',
      font: {
        family: "Montserrat",
        size: 13,
        weight: "500"
      }
    },
    legend: {
      position: "right"
    }
  },
  maintainAspectRatio: false
};

const data4 = {
  labels: ['Género'],
  datasets: [
    {
      label: 'Hombres',
      data: [19],
      backgroundColor: [
        '#108058',
      ],
      borderColor: [
        '#108058',
      ],
      borderWidth: 1,
    },
    {
      label: 'Mujeres',
      data: [12],
      backgroundColor: [
        '#F1B0D8',
      ],
      borderColor: [
        '#F1B0D8',
      ],
      borderWidth: 1,
    }
  ],
};

const options4 = {
  scales: {
    yAxes:
    {
      title: {
        display: true,
        text: 'Cantidad'
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'SEXO DE LOS ESTUDIANTES',
      position: 'bottom',
      font: {
        family: "Montserrat",
        size: 13,
        weight: "500"
      }
    },
    legend: {
      position: "right",
    }
  },
  maintainAspectRatio: false
};

const Informacion = ({ curso }) => {
  useEffect(() => {

  }, [])

  return (
    <>
      <div className="row">
        {/* titulo de la seccion */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div className="col s12 m6 titulo-modulo" style={{ textAlign: "left", marginLeft: "0px" }}>ESTADÍSTICAS</div>
          <div className="col s12 m6" style={{ fontFamily: "Montserrat", color: "#585858", fontSize: "17px", textAlign: "right" }}>
            Total de estudiantes: 152
          </div>
        </div>
        {/* apartir de aqui van las graficas */}
        <div className="row">
          <div className="col s12 m6 l5" style={{ padding: "2%" }}>
            <Pie
              data={data}
              width={400}
              height={400}
              options={options} />
          </div>
          <div className="col s12 m6 l7" style={{ padding: "2%" }}>
            <Line
              data={data2}
              options={options2}
              height={400} />
          </div>
          <div className="col s12 m6 l5" style={{ padding: "2%" }}>
            <Pie
              data={data3}
              width={400}
              height={400}
              options={options3} />
          </div>
          <div className="col s12 m6 l7" style={{ padding: "2%" }}>
            <Bar
              data={data4}
              height={400}
              options={options4} />
          </div>
        </div>

      </div>
    </>
  )
}

Informacion.layout = page => (
  <>
    <Layout title="Escuela sindical - Curso" pageTitle="Estadísticas">
      <LayoutCursos children={page} />
    </Layout>
  </>
)

export default Informacion
const express = require('express');
const app = express();
const port = 5000;

let publications = [
  {
    "idReport": 20,
    "idSubject": 21,
    "reportState": "Помилка валідації на боці інформагента",
    "termType": "Щоденні",
    "publicationType": "Подання інформації",
    "reportGroup": "Депозитарні установи",
    "outputNumber": "КС-10367",
    "outputDate": {
      "date": "2020-12-02 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "bSentToNSSMC": true,
    "bDisclosure": true,
    "dateFill": {
      "date": "2020-12-02 16:45:15.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "reportFormat": "txt"
  },
  {
    "idReport": 11,
    "idSubject": 21,
    "reportState": "Помилка валідації на боці інформагента",
    "termType": "Щоденні",
    "publicationType": "Подання інформації",
    "reportGroup": "Депозитарні установи",
    "outputNumber": "КС-10367",
    "outputDate": {
      "date": "2020-11-25 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "bSentToNSSMC": false,
    "bDisclosure": false,
    "dateFill": {
      "date": "2020-11-20 14:43:34.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "reportFormat": "xml"
  },
  {
    "idReport": 21,
    "idSubject": 21,
    "reportState": "Успішно подано до НКЦПФР",
    "termType": "Особлива та інша нерегулярна інформація",
    "publicationType": "Подання інформації",
    "reportGroup": "Емітенти цінних паперів",
    "outputNumber": "БН-18013",
    "outputDate": {
      "date": "2020-12-04 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "bSentToNSSMC": false,
    "bDisclosure": false,
    "dateFill": {
      "date": "2020-11-20 14:43:34.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "reportFormat": "xml"
  },
  {
    "idReport": 22,
    "idSubject": 21,
    "reportState": "Інформація про програмні продукти",
    "termType": "Інформація про програмні продукти",
    "publicationType": "Подання інформації",
    "reportGroup": "Професійний учасник",
    "outputNumber": "HH-00001",
    "outputDate": {
      "date": "2020-12-04 00:00:00.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "bSentToNSSMC": false,
    "bDisclosure": false,
    "dateFill": {
      "date": "2020-11-20 14:43:34.000000",
      "timezone_type": 3,
      "timezone": "Europe/Kiev"
    },
    "reportFormat": "xml"
  }
]

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.set('Access-Control-Allow-Methods', 'DELETE');
  next();
});

app.get('/api/publications', (req, res) => {
    res.json(publications);
  }
)

app.delete('/api/publications/:publicationId', (req, res) => {
  publications = publications.filter(publication => (
    publication.idReport !== parseInt(req.params.publicationId)
  ))

  res.json({status: 'success'})
})



app.listen(port, () => {
  console.log('started');
})

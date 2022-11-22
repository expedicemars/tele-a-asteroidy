# Aplikacia pre asteroidy a telemetriu lode

### Lokalne beziaca webova aplikacia robena v NodeJS a ExpressJS. Tato verzia uspesne bezala pocas Simulacie 2022.

- sucasna verzia ma funkcne asteroidy, a napisany zaklad pre telemetriu
- v buducnosti by sa bud mohol dopisat kod pre telemetriu, alebo by sa aplikacia mohla prepisat do Reactu, co by zlepsilo celkovu funkcionalitu a praktickost
- asteroidy momentalne nevydavaju zvuky

## Postup pre spustenie

1. Naklonuj repozitar pomocou: `git clone https://github.com/expedicemars/tele-a-asteroidy`
2. Instaluj Node.JS, MongoDB z internetu
3. Stiahni packages pomocou: `npm install`
4. Spusti aplikaciu pomocou: `npm start` alebo `node app.js`

## Postup pre pouzitie

1. Na serveri otvor http://localhost:8888/admin 
tam sa nachadza ovladaci panel pre asteroidy
2. Na cliente otvor [ip servera]:8888/asteroids tam sa nachadza simulacia asteroidov
3. Po vytvoreni poplachu v admin paneli pockaj 30 sekund, po ktorych asteroid narazi a poplach sa spusti
4. Poplach sa da predcasne vypnut stlacenim tlacidla Reset v admin paneli
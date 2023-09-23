# competitiontable

Competitiontable servira podatke o imaginarnom takmičenju neke grupe.  

Takmičenje funkcioniše na sledeći naćin:  
  * Takmičari mogu da rade određene akcije na osnovu koojih dobijaju poene. Akcija izvršena od strane igrača na neki datum je potez (play). Potezi mogu da se odbace i na taj način se dobijeni poeni više ne broje. Admin može da uvede u igru nove igrače, nove akcije, može da unese potez za igrača kao i da isti odbaci i može da promijeni broj bodova koje akcija nosi.

Ne postoji autentifikacija za admina, a admin panelu se pristupa preko putanje `/admin`.

Po dolasku na glavnu putanju prezentovano je trnutno stanje u tabeli. Korisnik može da prilagodi ispis i da stanje u tabeli pogleda na kraju prethodnih sezona, kao i na pojedinačne datume. Na taj način može da vidi simulaciju promjene stanja na tabeli iz dana u dan. Osim tabele u prilagodjenom ispisu može da se izabere prezentacija podataka o potezima igrača. Ponovo, po sezonama ili datumu.

Test aplikacije se nalazi [ovdje](https://competitiontable.onrender.com).

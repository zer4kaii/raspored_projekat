import React, { useEffect, useState } from "react";
import usePrivateGet from "../hooks/usePrivateGet";
import useAuth from "../hooks/useAuth";

const KreiranjeAktivnosti = () => {
  const [predavac, setPredavac] = useState();
  const { auth } = useAuth();
  const predavacData = usePrivateGet(`/predavaci/${auth.korisnicko_ime}`);
  const [predmeti, setPredmeti] = useState();
  const predmetiData = usePrivateGet("/predmeti/svi");

  useEffect(() => {
    setPredavac(predavacData);
    console.log(predavacData);
  }, [predavacData]);

  useEffect(() => {
    setPredmeti(predmetiData);
    console.log(predmetiData);
  }, [predmetiData]);

  return (
    <>
      <h2>KreiranjeAktivnosti</h2>
      <label>
        Predavac aktivnosti:
        <br />
        {predavac?.ime} {predavac?.prezime}
      </label>
      <label htmlFor='nazivAktivnostiInput'>
        Naziv aktivnosti
      </label>
      <input type='text' id='nazivAktivnostiInput'>
      </input>
      <label htmlFor="exampleDataList" className="form-label">
        Predmet:
      </label>
      <input
        className="form-control"
        type="text"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Type to search..."
      />
      <datalist id="datalistOptions">
        {predmeti?.map((predmet) => {
          return (
            <option key={predmeti.idPredmeta} value={predmet.nazivPredmeta} />
          );
        })}
      </datalist>
      <label htmlFor="exampleDataList" className="form-label">
        Tip aktivnosti
      </label>
      <input
        className="form-control"
        type="text"
        list="datalistOptions2"
        id="exampleDataList"
        placeholder="Type to search..."
      />
      <datalist id="datalistOptions2">
        <option value='Konsultacije'/>
        <option value='Nadoknada'/>
      </datalist>
      <label htmlFor='brojStudenataInput'>
        Broj studenata
      </label>
      <input type='text' id='brojStudenataInput'>
      </input>
      <label htmlFor='trajanjeInput'>
        Trajanje
      </label>
      <input type='text' id='trajanjeInput'>
      </input>
      
      <label>
        Napomena: Predavac moze da kreira samo neredovnu aktivnost.
      </label>
    </>
  );
};

export default KreiranjeAktivnosti;

import React, { useEffect, useState } from "react";
import usePrivateGet from "../hooks/usePrivateGet";

const TrazenjePoTerminu = () => {
  const [zauzetosti, setZauzetosti] = useState([]);

  // Vraca nam format
  // data.id.brUc
  // data.id.datum[GODINA,MESEC,DAN] u brojevima
  // data.id.vremeOd
  // data.vremeDo
  const zauzetostiData = usePrivateGet("/zauzetosti/sve");

  const [ucionice, setUcionice] = useState([]);
  const ucioniceData = usePrivateGet("/ucionice/sve");
  const [zauzeteUcionice, setZauzeteUcionice] = useState();
  const [vremeOd, setVremeOd] = useState();
  const [trajanje, setTrajanje] = useState();
  const [vremeDo, setVremeDo] = useState();
  const [datum, setDatum] = useState();

  const onVremeOdChange = (event) => {
    if (event.target.value > 24 || event.target.value < 0) setVremeOd(24);
    else {
      setVremeOd(event.target.value);
    }
  };

  const onTrajanjeChange = (event) => {
    if (event.target.value > 4 || event.target.value < 0) {
      setTrajanje(4);
      setVremeDo(vremeOd + 4);
    } else {
      setTrajanje(event.target.value);
      setVremeDo(parseInt(vremeOd) + parseInt(event.target.value));
    }
  };
  useEffect(() => {
    setZauzetosti(zauzetostiData);
    setUcionice(ucioniceData);
  }, [zauzetostiData, ucioniceData]);

  const onDatumChange = (event) => {
    const todays_date = new Date();
    todays_date.setHours(0, 0, 0, 0);
    const target_date = new Date(event.target.value);
    if (target_date < todays_date) {
      console.log("error");
      setDatum(event.target.value);
    }
    setDatum(event.target.value);
  };

  useEffect(() => {
    console.log('Izabrani '+ datum );
    setZauzeteUcionice([]);
    console.log(zauzetosti);
    const filter = zauzetosti.filter((data) => {
      const dataDatum =
        data.id.datum[0] +
        "-" +
        (data.id.datum[1] < 10 ? "0" + data.id.datum[1] : data.id.datum[1]) +
        "-" +
        data.id.datum[2];
      console.log('datum aktivnosti' + dataDatum);
      if (
        ((data.id.vremeOd <= vremeOd && data.vremeDo > vremeOd) ||
        (data.id.vremeOd < vremeDo &&
          data.vremeDo > vremeDo )) &&
          dataDatum === datum
      ) {
        setZauzeteUcionice((prev) => {
          return [...prev, data.id.brUc];
        });
      }
    });
  }, [vremeOd, vremeDo, datum]);

  return (
    <>
      <h3>Unesite termin</h3>
      <label>U koliko sati počinje?</label>
      <input
        type="text"
        onChange={onVremeOdChange}
        value={vremeOd}
        placeholder="napisie samo broj 0-23"
      ></input>
      <label>Koliko casova traje?</label>
      <input
        type="text"
        onChange={onTrajanjeChange}
        value={trajanje}
        placeholder="Broj casova"
      ></input>
      <label>Datum termina</label>
      <input
        type="date"
        onChange={onDatumChange}
        value={datum}
        placeholder="datum"
      ></input>
      <br />

      <h2>Slobodne ucionice u datom terminu</h2>
      <table className="ucioniceTabela">
        <thead>
          <tr>
            <th>Broj</th>

            <th>Tip</th>

            <th>Kapacitet za kolokvijum</th>

            <th>Kapacitet za predavanje</th>
          </tr>
        </thead>
        <tbody>
          {ucionice
            ?.filter((ucionica) => !zauzeteUcionice.includes(ucionica.broj))
            .map((ucionica) => {
              return (
                <tr key={ucionica.broj}>
                  <td>{ucionica.broj}</td>
                  <td>{ucionica.naziv}</td>
                  <td>{ucionica.kapK}</td>
                  <td>{ucionica.kapS}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TrazenjePoTerminu;


import { useEffect, useState } from 'react'
import Card from '../ui/Card';
import Spinner from '../ui/Spinner'

function PatientList() {
  
  const [patientData, setPatientData] = useState([]);
  console.log(patientData);
  useEffect(() => {
    fetch("https://clinic-srm.uz.custom.uz/patient-lists/")
      .then((val) => val.json())
      .then((res) => setPatientData(res));
  }, []);
  
  return (
    <div>
        <h2 style={{marginBottom: '20px', fontSize: '32px'}}>Bemorlar ro'yhati</h2>
            {patientData.length !== 0 ? patientData.map(patient => {
                return(
                    <div key={crypto.randomUUID()}>
                    <Card data={patient}/>
                    </div>
                )
            }) : <Spinner/>}
    </div>
  );
}

export default PatientList;

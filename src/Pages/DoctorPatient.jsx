
import { useEffect, useState } from 'react'
import Card from '../ui/Card';
import Spinner from '../ui/Spinner'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

function DoctorPatient() {
    const token = useSelector((state) => state.userToken.token)
    const decodedToken = jwtDecode(token);
  const [patientData, setPatientData] = useState([]);
  console.log(patientData);
  useEffect(() => {
    fetch(`https://clinic-srm.uz.custom.uz/doctor-patients/${decodedToken.user_id}`)
      .then((val) => val.json())
      .then((res) => setPatientData(res));
      console.log(patientData);
  }, [token]);
  
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

export default DoctorPatient;

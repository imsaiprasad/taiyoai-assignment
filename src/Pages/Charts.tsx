import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import axios from 'axios'

interface DataPoint {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

const Charts = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    // Your data

    axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then((res:any)=>{

      
    let dataX: Record<string, Record<string, number>> = res.data


    console.log("idx",dataX)
 

    // Transform the data for the Line Charts
    const transformedData: DataPoint[] = Object.keys(dataX?.cases).map((date) => ({
      date,
      cases: dataX.cases[date],
      deaths: dataX.deaths[date],
      recovered: dataX.recovered[date],
    }));

    setData(transformedData);
 
      
    })
    .catch((e)=>{
      console.log(e)
    })
    
    
  };


  const config = {
    data,
    xField: 'date',
    yField: 'cases', 
    seriesField: 'type', 
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return(
    <div style={{padding:"30px"}}>
      <Line {...config} />
      <div style={{marginTop:"30px",display:"flex"}}>
      The Above Chart shows Cases Fluctuation with respect to Dates
      </div>
    </div>
  );
};

export default Charts;

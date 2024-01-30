import React, { useRef, useEffect } from 'react';
import { IonContent, IonPage, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import * as d3 from 'd3';
import './Dashboard.scss';

const Dashboard: React.FC = () => {

    const ref = useRef(null);

    useEffect(() => {
        const data = [20, 40, 20, 42, 45];
        drawBarChart(data);
    }, []);

    const drawBarChart = (data: number[]) => {
        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(data.map((_, i) => `Día ${i + 1}`))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data) || 0])
            .range([height, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).tickFormat(d => `$${d}`);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(`Día ${i + 1}`) || 0)
            .attr("y", (d) => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d))
            .attr("fill", "green");
    };

    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12" className='ion-text-center'>
                            <IonText>Ventas</IonText>
                        </IonCol>
                        <IonCol size="12">
                            <div className='center'>
                                <svg ref={ref}></svg>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;
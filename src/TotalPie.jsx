import React, { useEffect, useState } from 'react';
import "./TotalPie.css"

const TotalPie = () => {
    const [totalVotesChartData, setTotalVotesChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://plusw.github.io/street2024/data.json'); // Update the path accordingly
                const data = await response.json();
                calculateTotalVotes(data.votesSets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateTotalVotes = (data) => {
        const totalVotes = {};

        data.forEach((votesSet) => {
            const numberOfVotes = votesSet.NumberOfVotes;

            Object.entries(numberOfVotes).forEach(([candidate, votes]) => {
                totalVotes[candidate] = (totalVotes[candidate] || 0) + parseFloat(votes);
            });
        });

        const chartData = [['Candidate', 'Votes']];
        Object.entries(totalVotes).forEach(([candidate, votes]) => {
            chartData.push([candidate, votes]);
        });

        setTotalVotesChartData(chartData);
    };

    useEffect(() => {
        if (totalVotesChartData) {
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                const data = google.visualization.arrayToDataTable(totalVotesChartData);
                const options = {
                    title: '截至12.20第二波总票数',
                    colors: ['rgb(85, 225, 230)', 'rgb(32, 171, 76)', 'rgb(36, 125, 189)'],
                    pieSliceText: 'value',
                };

                const chartInstance = new google.visualization.PieChart(document.getElementById('totalChart'));
                chartInstance.draw(data, options);
            }
        }
    }, [totalVotesChartData]);

    return (
        <>
            <div id="totalPie_container">
                <div className='a_pie' id='totalChart'>
                    {/* The total pie chart will be drawn here */}
                </div>
            </div>
        </>
    );
};

export default TotalPie;

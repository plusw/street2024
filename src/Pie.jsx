import React, { useEffect, useState } from 'react';
import "./Pie.css"
const Pie = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // 从 JSON 文件获取数据
        fetch('https://plusw.github.io/street2024/data.json')
            .then(response => response.json())
            .then(data => {
                // 处理获取到的数据并更新 chartData 状态
                const votesSets = data.votesSets;
                const chartDataArray = votesSets.map((votesSet, index) => {
                    const numberOfVotes = votesSet.NumberOfVotes;
                    const chartData = [['Candidate', 'Votes']];
                    Object.entries(numberOfVotes).forEach(([candidate, votes]) => {
                        chartData.push([candidate, parseFloat(votes)]);
                    });
                    return {
                        id: `chart${index}`, // 每个图表的唯一标识
                        title: `${votesSet.location} - ${votesSet.time}`, // 图表标题
                        data: chartData,
                    };
                });
                setChartData(chartDataArray);
            })
            .catch(error => console.error('获取数据时出错:', error));
    }, []); // 空的依赖数组确保 useEffect 只运行一次

    useEffect(() => {
        // 只有在 chartData 可用时才绘制图表
        if (chartData) {
            // 加载 Google Charts 库
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawCharts);

            function drawCharts() {
                chartData.forEach(chart => {
                    // 设置数据
                    const data = google.visualization.arrayToDataTable(chart.data);

                    // 设置选项
                    const options = {
                        title: chart.title, // 使用标题
                        colors: ['rgb(85, 225, 230)', 'rgb(32, 171, 76)', 'rgb(36, 125, 189)'], // Specify your custom colors here
                        pieSliceText: 'value',
                    };

                    // 绘制图表
                    const chartInstance = new google.visualization.PieChart(document.getElementById(chart.id));
                    chartInstance.draw(data, options);
                });
            }
        }
    }, [chartData]);

    return (
        <>
            <p><b>各縣市數據</b></p>
            <div id='container'>
                {chartData &&
                    <>

                        {chartData.map(chart => (
                            <div className='a_pie' key={chart.id} id={chart.id} >
                                {/* Each chart will be drawn here */}
                            </div>
                        ))}
                    </>
                }
            </div>
        </>
    );
};

export default Pie;

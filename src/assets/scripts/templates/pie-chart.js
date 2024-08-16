import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const TEMPLATE_CLASS = '.template-pie-chart';
const CHART_ITEM_CLASS = '.template-pie-chart__item';
const CHART_CONTAINER_CLASS = '.template-pie-chart__chart';
const CHART_CIRCLE_CLASS = '.template-pie-chart__circle';

const BG_DARK_CLASS = 'bg-dark';

export default function PieChart() {
    document.querySelectorAll(TEMPLATE_CLASS).forEach((template) => {
        const chart = template.querySelector(CHART_CONTAINER_CLASS);
        const chartItems = template.querySelectorAll(CHART_ITEM_CLASS);
        const isBgDark = template.classList.contains(BG_DARK_CLASS);

        const data = {
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                    borderWidth: 0,
                },
            ],
        };

        chartItems.forEach((chartItem) => {
            const itemValue = +chartItem.dataset.value;
            const itemCircle = chartItem.querySelector(CHART_CIRCLE_CLASS);
            const itemBg = window.getComputedStyle(itemCircle).backgroundColor;

            data.datasets[0].data.push(itemValue);
            data.datasets[0].backgroundColor.push(itemBg);
        });

        Chart.defaults.layout.padding = 0;
        Chart.defaults.font.family = 'obviously-variable';

        if (window.innerWidth < 768) {
            Chart.defaults.font.size = 20;
            Chart.defaults.layout.padding = 35;
            Chart.defaults.set('plugins.datalabels', {
                offset: 0,
                font: {
                    size: '20',
                },
            });
        } else {
            Chart.defaults.font.size = 24;
            Chart.defaults.layout.padding = 60;
            Chart.defaults.set('plugins.datalabels', {
                offset: 15,
                font: {
                    size: '24',
                },
            });

            if (isBgDark) {
                Chart.defaults.set('plugins.datalabels', {
                    color: '#fff',
                });
            }
        }

        const chartObj = new Chart(chart, {
            type: 'pie',
            plugins: [ChartDataLabels],
            data: data,
            options: {
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        display: true,
                        clamp: true,
                        formatter: function (value) {
                            return value > 0 ? value + '%' : '';
                        },
                    },
                },
                events: [],
            },
        });

        let prevWidth = 0;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.borderBoxSize?.[0].inlineSize;
                if (typeof width === 'number' && width !== prevWidth) {
                    prevWidth = width;

                    if (window.innerWidth < 768) {
                        Chart.defaults.font.size = 20;
                        Chart.defaults.layout.padding = 35;
                        Chart.defaults.set('plugins.datalabels', {
                            offset: 0,
                            font: {
                                size: '20',
                            },
                            color: 'transparent',
                        });
                    } else {
                        Chart.defaults.font.size = 24;
                        Chart.defaults.layout.padding = 60;
                        Chart.defaults.set('plugins.datalabels', {
                            offset: 15,
                            font: {
                                size: '24',
                            },
                        });

                        if (isBgDark) {
                            Chart.defaults.set('plugins.datalabels', {
                                color: '#fff',
                            });
                        }
                    }

                    chartObj.resize();
                }
            }
        });

        resizeObserver.observe(document.body);
    });
}

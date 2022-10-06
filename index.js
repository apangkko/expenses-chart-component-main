

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        let days = [];
        let spends = [];

        json.forEach(item => {
            days.push(item.day);
            spends.push(item.amount);
        });

        function argMax(array) {
            return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
        }

        var labels = days.map((x, i) => i.toString()); 

        // other data color
        var color = days.map(x => 'hsl(10, 79%, 65%)');
        var hoverColor = days.map(x => 'hsl(10, 100%, 76%)');

        // change max color
        color[argMax(days)] = 'hsl(186, 34%, 60%)';
        hoverColor[argMax(days)] = 'hsl(188, 48%, 80%)';
        
        const data = {
        labels: days,
        datasets: [{
            backgroundColor: color,
            borderRadius: 3,
            borderSkipped: false,
            data: spends,
            hoverBackgroundColor: hoverColor,
        }]
        };
        
        const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    backgroundColor: 'hsl(25, 47%, 15%)',
                    bodyFont: {
                        family: 'DM Sans',
                        size: 16,
                        weight: 700,
                    },
                    callbacks: {
                       title : () => null,
                       label: function(context) {
                        let label = context.dataset.label || '';
            
                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(context.parsed.y);
                        }
                        return label;
                      }
                    },
                    yAlign: 'bottom',
                    caretSize: 0,
                 }
            },
            scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    font: {
                        family: 'DM Sans',
                        size: 14,
                    },
                    color: 'hsl(28, 10%, 53%)',
                  },
                },
                y: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              }
            }
        };
        
        const expenseChart = new Chart(
        document.getElementById('expenseChart'),
        config
        );
    });

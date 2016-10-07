    function getObject ()
    {
        return RGraph.ObjectRegistry.getFirstObjectByType('line');
    }

    window.onload = function ()
    {
    new RGraph.Line({
        id: 'cvs',
        data: [19,13,5,-4,-6,-1,3,5,8,9,4,7,8],
        options: {
            hmargin: 10,
            gutterBottom: 125,
            outofbounds: true,
            linewidth: 2,
            backgroundGridAutofitNumhlines: 6,
            ylabelsCount: 6,
            colors: ['red'],
            ymax: 20,
            ymin: -10,
            numyticks: 3,
            unitsPost: '°C',
            gutterLeft: 50,
            labels: ['9:00','10:00','11:00','12:00','13:00','14:00','15:00'],
            textAccessible: true
        }
    }).draw();
    };
    
        
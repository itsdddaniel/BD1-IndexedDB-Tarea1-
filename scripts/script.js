var db;
request = indexedDB.open("myDatabase");

request.onupgradeneeded = function(event)
{ 
    var db = event.target.result;
    var objectStore = db.createObjectStore("tableOne", { keyPath: "one",  autoIncrement:true });
    var objectStoreTwo = db.createObjectStore("tableTwo", { keyPath: "two",  autoIncrement:true });
    console.log("Base de datos creada.");
};

request.onerror = function(event)
{
    console.error(event.target.errorCode);
}

request.onsuccess = function(event)
{
    db = event.target.result;
    console.log("Success");
    updateTables();
};

/**
 * ! Función que verifica si hay datos existentes
 * en las tablas de las bases de datos, si los hay
 * actulizar los select's en pantalla.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function updateTables()
{
    db.transaction("tableOne","readwrite").objectStore("tableOne").openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor)
        {  
            var selectObjectTwo = document.getElementById('secondSelectID');
            var optionTwo = document.createElement('option');
            optionTwo.text = cursor.value.content;
            selectObjectTwo.appendChild(optionTwo);
            cursor.continue();
        }
    }
    db.transaction("tableTwo","readwrite").objectStore("tableTwo").openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor)
        {  
            var selectObject = document.getElementById('firstSelectID');
            var option = document.createElement('option');
            option.text = cursor.value.content;
            selectObject.appendChild(option);
            cursor.continue();
        }
    }   
}

/**
 * ! Función que verifica cual de los botones
 * fue presionado mediante su ID para luego
 * ejecutar la función que corresponde.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function buttonClicked(clickedID)
{
    if(clickedID == "moveOne")
    {
        moveOne();
    }
    else if(clickedID == "moveTwo")
    {
        moveTwo();
    }
    else if(clickedID == "moveAllOne")
    {
        moveAllOne();
    }
    else if(clickedID == "moveAllTwo")
    {
        moveAllTwo();
    }
    else if(clickedID == "delete")
    {
        deleteValue();
    }
    else if(clickedID == "clear")
    {
        clearInputValue();
    }
}

/**
 * ! Función que verifica todos los escenarios posible para
 * poder realizar la inserción y mover datos de la tabla dos
 * a la tabla uno de la bases de datos. También haciendolo
 * visualmente en la página.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function moveOne()
{
    var inputValue = document.getElementById("inputID").value;
    var selectObject = document.getElementById('firstSelectID');
    var selectObjectTwo = document.getElementById('secondSelectID');
    var option = document.createElement('option');
    
    if(selectObjectTwo.options.length)
    {   

        for(let i = 0; i<selectObject.length; i++)
        {
            var selectObjectOption = selectObject.options[i].selected;
            var selectObjectValue = selectObject.options[i].value;
            
            if(selectObjectOption == true)
            {
                var option = document.createElement("option");
                option.text = selectObjectValue;
                selectObjectTwo.add(option);
                
                setTimeout
                (
                    function()
                    {
                        let length = selectObject.options.length;
                        for(let z = length-1; z >= 0; z--)
                        {
                            if(selectObject.options[z].selected == true)
                            {
                                selectObject.options[z] = null;
                            }
                            else
                            {
                                console.warn("Pass - WarningCode#1");
                            }
                        }
                    },
                    500
                );    
                clearTimeout(500);
                    
                if(Number(selectObjectValue))
                {
                    db.transaction("tableTwo","readwrite").objectStore("tableTwo").openCursor().onsuccess = function(event)
                    {
                        var cursor = event.target.result;
                        if(cursor)
                        {          
                            if(cursor.value.content==selectObject.options[i].value)
                            {
                                db.transaction("tableTwo","readwrite").objectStore("tableTwo").delete(cursor.key);
                
                                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #2 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #1 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                            }
                            cursor.continue();
                        }
                    }
                    db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObjectValue});
                }
                else if(String(selectObjectValue))
                {
                    db.transaction("tableTwo","readwrite").objectStore("tableTwo").openCursor().onsuccess = function(event)
                    {
                        var cursor = event.target.result;
                        if(cursor)
                        {          
                            if(cursor.value.content==selectObject.options[i].value)
                            {
                                db.transaction("tableTwo","readwrite").objectStore("tableTwo").delete(cursor.key);
                
                                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #2 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #1 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                            }
                            cursor.continue();
                        }
                    }
                    db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObjectValue});
                }
                console.log("Se ha actualizado ambas tablas exitosamente. - Exit Code #1");
            }
        }

            if(inputValue.length > 0)
            {
                var option = document.createElement('option');
                option.text = inputValue;
                selectObjectTwo.add(option);
                document.getElementById("inputID").value = "";
                db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:inputValue});
                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                {
                    console.log(`Se ha añadido el valor: ${inputValue} a la tabla #1`);
                    console.log(event.target.result);
                }
            }
            else if(inputValue.length == 0)
            {
                console.warn("Pass - Warning Code #1")
            }
    }
    else
    {
        /*
            Mover los elementos seleccionados en caso de que no haya ningun valor en la segunda tabla.
        */
            for(var j = 0; j<selectObject.length; j++)
            {
                var selectObjectValue = selectObject.options[j].value;
                var selectObjectOption = selectObject.options[j].selected;
            }
            if (inputValue.length > 0)
            {
                var option = document.createElement('option');
                option.text = inputValue;
                selectObjectTwo.add(option);
                document.getElementById('inputID').value = "";
                
                db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:inputValue});
                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                {
                    console.log(`Se ha añadido el valor: ${inputValue} a la tabla #1`);
                    console.log(event.target.result);
                }
            }
            else if(inputValue == 0 && selectObjectValue == true)
            {   
                var option = document.createElement('option');
                option.text = selectObjectValue;
                selectObjectTwo.add(option);
    
                setTimeout
                (
                    function()
                    {
                        let length = selectObject.options.length;
                        for(let z = length-1; z >= 0; z--)
                        {
                            if(selectObject.options[z].selected == true)
                            {
                                selectObject.options[z] = null;
                            }
                            else
                            {
                                console.warn("Pass - WarningCode#1");
                            }
                        }
                    },
                    500
                );    
                clearTimeout(500);
      
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                {
                    console.group("Datos encontrados antes en la tabla #2:")
                    console.log(event.target.result);
                    console.groupEnd();
                }
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").delete(Number(selectObjectValue));
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                {
                    console.group("Datos encontrados despues en la tabla #2:")
                    console.log(event.target.result);
                    console.groupEnd();
                }
    
                db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObjectValue});
                console.log("Se ha actualizado ambas tablas exitosamente. - Exit Code #1");
            }
            else if(inputValue == 0 && selectObjectTwo.length == 0)
            {
                for(let i = 0; i<selectObject.length; i++)
                {
                    var selectObjectOption = selectObject.options[i].selected;
                    var selectObjectValue = selectObject.options[i].value;
        
                    if(selectObjectOption == true)
                    {
                        var option = document.createElement("option");
                        option.text = selectObjectValue;
                        selectObjectTwo.add(option);
                        
                        setTimeout
                        (
                            function()
                            {
                                let length = selectObject.options.length;
                                for(let z = length-1; z >= 0; z--)
                                {
                                    if(selectObject.options[z].selected == true)
                                    {
                                        selectObject.options[z] = null;
                                    }
                                    else
                                    {
                                        console.warn("Pass - WarningCode#1");
                                    }
                                }
                            },
                            500
                        );    
                        clearTimeout(500);
                        
                        if(String(selectObjectValue))
                        {
                            db.transaction("tableTwo","readwrite").objectStore("tableTwo").openCursor().onsuccess = function(event)
                            {
                                var cursor = event.target.result;
                                if(cursor)
                                {          
                                    if(cursor.value.content==selectObject.options[i].value)
                                    {
                                        db.transaction("tableTwo","readwrite").objectStore("tableTwo").delete(cursor.key);
                        
                                        db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                        {
                                            console.group("Datos en la tabla #2 después de mover los datos: ");
                                            console.log(event.target.result);
                                            console.groupEnd();
                                        }
                                        db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                        {
                                            console.group("Datos en la tabla #1 después de mover los datos: ");
                                            console.log(event.target.result);
                                            console.groupEnd();
                                        }
                                    }
                                    cursor.continue();
                                }
                            }
                            db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObjectValue});
                        }
                        else if(Number(selectObjectValue))
                        {
                            db.transaction("tableTwo","readwrite").objectStore("tableTwo").openCursor().onsuccess = function(event)
                            {
                                var cursor = event.target.result;
                                if(cursor)
                                {          
                                    if(cursor.value.content==selectObject.options[i].value)
                                    {
                                        db.transaction("tableTwo","readwrite").objectStore("tableTwo").delete(cursor.key);
                        
                                        db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                        {
                                            console.group("Datos en la tabla #2 después de mover los datos: ");
                                            console.log(event.target.result);
                                            console.groupEnd();
                                        }
                                        db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                        {
                                            console.group("Datos en la tabla #1 después de mover los datos: ");
                                            console.log(event.target.result);
                                            console.groupEnd();
                                        }
                                    }
                                    cursor.continue();
                                }
                            }
                            db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObjectValue});
                        }
                    }
                }
            }
    }
}

/**
 * ! Función que verifica todos los escenarios posible para
 * poder realizar la inserción y mover datos de la tabla uno
 * a la tabla dos de la bases de datos. También haciendolo
 * visualmente en la página.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function moveTwo()
{
    var inputValue = document.getElementById("inputID").value;
    var selectObject = document.getElementById('firstSelectID');
    var selectObjectTwo = document.getElementById('secondSelectID');
    var option = document.createElement('option');
    
    if(selectObject.options.length)
    {   
    
        for(let i = 0; i<selectObjectTwo.length; i++)
        {
            var selectObjectTwoOption = selectObjectTwo.options[i].selected;
            var selectObjectTwoValue = selectObjectTwo.options[i].value;

            if(selectObjectTwoOption == true)
            {
                var option = document.createElement("option");
                option.text = selectObjectTwoValue;
                selectObject.add(option);
    
                setTimeout
                (
                    function()
                    {
                        let length = selectObjectTwo.options.length;
                        for(let z = length-1; z >= 0; z--)
                        {
                            if(selectObjectTwo.options[z].selected == true)
                            {
                                selectObjectTwo.options[z] = null;
                            }
                            else
                            {
                                console.warn("Pass - WarningCode#1");
                            }
                        }
                    },
                    500
                );    
                clearTimeout(500);

                if(Number(selectObjectTwoValue))
                {
                    db.transaction("tableOne","readwrite").objectStore("tableOne").openCursor().onsuccess = function(event)
                    {
                        var cursor = event.target.result;
                        if(cursor)
                        {          
                            if(cursor.value.content==selectObjectTwo.options[i].value)
                            {
                                db.transaction("tableOne","readwrite").objectStore("tableOne").delete(cursor.key);
                
                                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #2 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #1 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                            }
                            cursor.continue();
                        }
                    }
                    db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwoValue});
                }
                else if(String(selectObjectTwoValue))
                {
                    db.transaction("tableOne","readwrite").objectStore("tableOne").openCursor().onsuccess = function(event)
                    {
                        var cursor = event.target.result;
                        if(cursor)
                        {          
                            if(cursor.value.content==selectObjectTwo.options[i].value)
                            {
                                db.transaction("tableOne","readwrite").objectStore("tableOne").delete(cursor.key);
                
                                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #2 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                {
                                    console.group("Datos en la tabla #1 después de mover los datos: ");
                                    console.log(event.target.result);
                                    console.groupEnd();
                                }
                            }
                            cursor.continue();
                        }
                    }
                    db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwoValue});
                }
                console.log("Se ha actualizado ambas tablas exitosamente. - Exit Code #1");
            }
        }
    
        if(inputValue.length > 0)
        {
            var option = document.createElement('option');
            option.text = inputValue;
            selectObject.add(option);
            document.getElementById("inputID").value = "";
            db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:inputValue});
            db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
            {
                console.log(`Se ha añadido el valor: ${inputValue} a la tabla #2`);
                console.log(event.target.result);
            }
            db.transaction("tableTwo").objectStore("tableTwo").get(inputValue).onerror = function()
            {
                console.error("Error al ingresar dato a la tabla - Special Error Code #1");
            }
        }
        else if(inputValue.length == 0)
        {
            console.warn("Pass - Warning Code #1")
        }
    }
    else
    {
        /*
            Mover los elementos seleccionados en caso de que no haya ningun valor en la segunda base de datos.
        */
        for(var j = 0; j<selectObjectTwo.length; j++)
        {
            var selectObjectTwoValue = selectObjectTwo.options[j].value;
            var selectObjectTwoOption = selectObjectTwo.options[j].selected;
        }
        for(var i = 0; i<selectObject.length; i++)
        {
            var selectObjectOption = selectObject.options[i].selected;
            var selectObjectValue = selectObject.options[i].value;
            var option = document.createElement("option");  
            if(inputValue.length == 0)
            {
                console.error("Ingrese un dato valido. - Error Code #2");
            }
        }
        if (inputValue.length > 0)
        {
            var option = document.createElement('option');
            option.text = inputValue;
            selectObject.add(option);
            document.getElementById('inputID').value = "";
            db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:inputValue});
            db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
            {
                console.log(`Se ha añadido el valor: ${inputValue} a la tabla #2`);
                console.log(event.target.result);
            }
            db.transaction("tableTwo").objectStore("tableTwo").get(inputValue).onerror = function()
            {
                console.error("Error al ingresar dato a la tabla - Special Error Code #1");
            }
        }
        else if(inputValue == 0 && selectObjectTwoValue == true)
        {   
            console.log("true");
            var option = document.createElement('option');
            option.text = selectObjectTwoValue;
            selectObject.add(option);

            setTimeout
            (
                function()
                {
                    let length = selectObjectTwo.options.length;
                    for(let z = length-1; z >= 0; z--)
                    {
                        if(selectObjectTwo.options[z].selected == true)
                        {
                            selectObjectTwo.options[z] = null;
                        }
                        else
                        {
                            console.warn("Pass - WarningCode#1");
                        }
                    }
                },
                500
            );    
            clearTimeout(500);
  
            db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
            {
                console.group("Datos encontrados antes en la tabla #1:")
                console.log(event.target.result);
                console.groupEnd();
            }
            db.transaction("tableOne","readwrite").objectStore("tableOne").delete(Number(selectObjectTwoValue));
            db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
            {
                console.group("Datos encontrados despues en la tabla #1:")
                console.log(event.target.result);
                console.groupEnd();
            }

            db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwoValue});
        }
        else if(inputValue == 0 && selectObject.length == 0)
        {
            for(let i = 0; i<selectObjectTwo.length; i++)
            {
                var selectObjectTwoOption = selectObjectTwo.options[i].selected;
                var selectObjectTwoValue = selectObjectTwo.options[i].value;
    
                if(selectObjectTwoOption == true)
                {
                    var option = document.createElement("option");
                    option.text = selectObjectTwoValue;
                    selectObject.add(option);
                    
                    setTimeout
                    (
                        function()
                        {
                            let length = selectObjectTwo.options.length;
                            for(let z = length-1; z >= 0; z--)
                            {
                                if(selectObjectTwo.options[z].selected == true)
                                {
                                    selectObjectTwo.options[z] = null;
                                }
                                else
                                {
                                    console.warn("Pass - WarningCode#1");
                                }
                            }
                        },
                        500
                    );    
                    clearTimeout(500);
                    if(String(selectObjectTwoValue))
                    {
                        db.transaction("tableOne","readwrite").objectStore("tableOne").openCursor().onsuccess = function(event)
                        {
                            var cursor = event.target.result;
                            if(cursor)
                            {          
                                if(cursor.value.content==selectObjectTwo.options[i].value)
                                {
                                    db.transaction("tableOne","readwrite").objectStore("tableOne").delete(cursor.key);
                    
                                    db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                    {
                                        console.group("Datos en la tabla #2 después de mover los datos: ");
                                        console.log(event.target.result);
                                        console.groupEnd();
                                    }
                                    db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                    {
                                        console.group("Datos en la tabla #1 después de mover los datos: ");
                                        console.log(event.target.result);
                                        console.groupEnd();
                                    }
                                }
                                cursor.continue();
                            }
                        }
                        db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwoValue});
                    }
                    else if(Number(selectObjectTwoValue))
                    {
                        db.transaction("tableOne","readwrite").objectStore("tableOne").openCursor().onsuccess = function(event)
                        {
                            var cursor = event.target.result;
                            if(cursor)
                            {          
                                if(cursor.value.content==selectObjectTwo.options[i].value)
                                {
                                    db.transaction("tableOne","readwrite").objectStore("tableOne").delete(cursor.key);
                    
                                    db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                                    {
                                        console.group("Datos en la tabla #2 después de mover los datos: ");
                                        console.log(event.target.result);
                                        console.groupEnd();
                                    }
                                    db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                                    {
                                        console.group("Datos en la tabla #1 después de mover los datos: ");
                                        console.log(event.target.result);
                                        console.groupEnd();
                                    }
                                }
                                cursor.continue();
                            }
                        }
                        db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwoValue});
                    }
                }
            }
        }
    }
}

/**
 * ! Función que mueve todos los datos de la tabla dos a uno
 * haciendolo visualmente así también internamente con la tabla
 * de la bases de datos.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function moveAllOne()
{
    var selectObject = document.getElementById('firstSelectID');
    var selectObjectTwo = document.getElementById('secondSelectID');
    
    if(selectObjectTwo.options.length)
    {
        for(let i = 0; i<selectObject.options.length; i++)
        {
            var option = document.createElement("option");
            option.text = selectObject.options[i].value;
            selectObjectTwo.add(option);
            setTimeout
            (
                function()
                {
                    selectObject.options.length = 0;
                },
                500
                );    
                clearTimeout(500);

                db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObject.options[i].value});
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").clear();
                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #1 después de mover los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
        }
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #2 después de mover los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
    }
    else
    {
        for(let i = 0; i<selectObject.options.length; i++)
        {
            var option = document.createElement("option");
            option.text = selectObject.options[i].value;
            selectObjectTwo.add(option);
            setTimeout
            (
                function()
                {
                    selectObject.options.length = 0;
                },
                500
            );    
            clearTimeout(500);

            db.transaction("tableOne", "readwrite").objectStore("tableOne").add({content:selectObjectTwo.options[i].value});
            db.transaction("tableTwo","readwrite").objectStore("tableTwo").clear();
            db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
            {
                console.group("Datos en la tabla #1 después de mover los datos: ");
                console.log(event.target.result);
                console.groupEnd();
            }
            db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
            {
                console.group("Datos en la tabla #2 después de mover los datos: ");
                console.log(event.target.result);
                console.groupEnd();
            }
        }
    }
}

/**
 * ! Función que mueve todos los datos de la tabla uno a dos
 * haciendolo visualmente así también internamente con la tabla
 * de la bases de datos.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function moveAllTwo()
{
    var selectObject = document.getElementById('firstSelectID');
    var selectObjectTwo = document.getElementById('secondSelectID');
    
    if(selectObject.options.length)
    {
        for(let i = 0; i<selectObjectTwo.options.length; i++)
        {
            var option = document.createElement("option");
            option.text = selectObjectTwo.options[i].value;
            selectObject.add(option);
            setTimeout
            (
                function()
                {
                    selectObjectTwo.options.length = 0;
                },
                500
                );    
                clearTimeout(500);

                db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwo.options[i].value});
                db.transaction("tableOne","readwrite").objectStore("tableOne").clear();
                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #1 después de mover los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #2 después de mover los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
            }
    }
    else
    {
        for(let i = 0; i<selectObjectTwo.options.length; i++)
        {
            var option = document.createElement("option");
            option.text = selectObjectTwo.options[i].value;
            selectObject.add(option);
            setTimeout
            (
                function()
                {
                    selectObjectTwo.options.length = 0;
                },
                500
                );    
                clearTimeout(500);

                db.transaction("tableTwo", "readwrite").objectStore("tableTwo").add({content:selectObjectTwo.options[i].value});
                db.transaction("tableOne","readwrite").objectStore("tableOne").clear();
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #2 después de mover los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #1 después de mover los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
        }
    }
}

/**
 * ! Función que elimina los visualmente las opciones que
 * existen en alguno de los dos select's y luego hace un  
 * llamado a una función donde se eliminan los valores
 * de las tablas de la base datos.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function deleteValue()
{
    var selectObject = document.getElementById('firstSelectID');
    var selectObjectTwo = document.getElementById('secondSelectID');

    var selectedOptions = [];
    var selectedTwoOptions = [];

    var selectedValueOptions = [];
    var selectedTwoValueOptions = [];
    
    var indexTwo = selectObjectTwo.options.length;
    var index = selectObject.options.length;

    for(let i = 0; i<selectObject.options.length; i++)
    {
        selectedOptions[i] = selectObject.options[i].selected;
        selectedValueOptions[i] = selectObject.options[i].value;
    }
    for(let j = 0; j<selectObjectTwo.options.length; j++)
    {
        selectedTwoOptions[j] = selectObjectTwo.options[j].selected;
        selectedTwoValueOptions[j] = selectObjectTwo.options[j].value; 
    }

    if(typeof selectObject.options[selectObject.selectedIndex] == "undefined")
    {
        console.warn("Pass - Warning Code#7");
        selectObjectSelectedAndValue = selectObjectTwo.options[selectObjectTwo.selectedIndex].value;
        while(indexTwo --)
        {
            if(selectedTwoOptions[indexTwo])
            {
                selectObjectTwo.remove(indexTwo);
                deleteFromTableOne(selectObjectSelectedAndValue);
            }
        }
    }
    else if(typeof selectObject.options[selectObject.selectedIndex] !== "undefined")
    {      
        selectObjectTwoSelectedAndValue = selectObject.options[selectObject.selectedIndex].value;
        while(index --)
        {
            if(selectedOptions[index])
            {
                selectObject.remove(index);
                deleteFromTableTwo(selectObjectTwoSelectedAndValue);
            }
        }
    }
    else if(typeof selectObjectTwo.options[selectObjectTwo.selectedIndex] == "undefined")
    {
        console.warn("Pass - Warning Code#7");
        while(index --)
        {
            if(selectedOptions[index])
            {
                selectObject.remove(index);
                deleteFromTableTwo(selectObjectTwoSelectedAndValue);
            }
        }
    }
    else if(typeof selectObjectTwo.options[selectObjectTwo.selectedIndex] !== "undefined")
    {      
        selectObjectSelectedAndValue = selectObjectTwo.options[selectObjectTwo.selectedIndex].value;
        while(indexTwo --)
        {
            console.log(selectedTwoOptions[indexTwo]);
            if(selectedTwoOptions[indexTwo])
            {
                selectObjectTwo.remove(indexTwo);
                deleteFromTableOne(selectObjectSelectedAndValue);
            }
        }
    }
}

/**
 * ! Función que elimina los datos de la tabla número uno.
 * @param select dato que recibe siendo el objecto select uno de la página.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function deleteFromTableOne(select)
{
    db.transaction("tableOne","readwrite").objectStore("tableOne").openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor)
        {  
            if(cursor.value.content==select)
            {
                db.transaction("tableOne","readwrite").objectStore("tableOne").delete(cursor.key);
                db.transaction("tableOne","readwrite").objectStore("tableOne").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #1 después de borrar los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
                cursor.continue();
            }
            else
            {
                cursor.continue();
            }
        }
    }
}

/**
 * ! Función que elimina los datos de la tabla número dos.
 * @param select dato que recibe siendo el objecto select dos de la página.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function deleteFromTableTwo(select)
{
    db.transaction("tableTwo","readwrite").objectStore("tableTwo").openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor)
        {  
            if(cursor.value.content==select)
            {
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").delete(cursor.key);
                db.transaction("tableTwo","readwrite").objectStore("tableTwo").getAll().onsuccess = function(event)
                {
                    console.group("Datos en la tabla #2 después de borrar los datos: ");
                    console.log(event.target.result);
                    console.groupEnd();
                }
                cursor.continue();
            }
            else
            {
                cursor.continue();
            }
        }
    }
}

/**
 * ! Función que limpia el input de haber alguna texto en el mismo.
 * @author Daniel Alessandro Arteaga Martínez
 * @date 27/03/2021
 * @version 1.0
 */
function clearInputValue()
{
    document.getElementById('inputID').value = "";
}
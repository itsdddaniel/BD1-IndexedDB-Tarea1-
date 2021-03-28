@author Daniel Arteaga
@version 1.0
@date 27/03/2021

# Importante

Lo expuesto acontinuación es una explicación grafica de las cosas, es decir, todo lo que se vea representado en la página web y ciertos componentes en consola como los error codes y warning codes. Sobre IndexedDB ya esta aplicado conjunto a todos lo componentes de HTML y Javascript en el código, una vez leido los articulos proporcionados en la definción de la tarea serán esos mismos componentes que se aplicaran.

# Análisis de la Tarea #1

Teniendo la definición y la siguiente información: <br>
[Basic Concepts Behind IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB) <br>
[Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

Se comienza a leer la información proporcionada y se llega a la conclusión de hacer uso de POO(Programación Orientada a Objetos) donde debe llevar encapsulación y la extracción de los datos haciendo el uso del lenguaje de programación de Javascript puro donde se usa programación asincrona.

# Hallazgos Encontrados

A continuación se presenta una serie de preguntas y respuestas al momento de desarrollar el IndexBD.

## <u>¿Que elementos se usaran?</u>
<br>

- Una vez visto el mockup en la definición de la tarea se empieza buscar los posibles 'tags' que se pueden usar.

- Al hacer busqueda de todo lo necesario nos damos cuenta que se debe usar el tag '<select><option>Ejemplo</option></select>'. Sin embargo como se puede apreciar este tag solo muestra las opciones una vez que se la hecho click.

- Investigando más se llega a la conclusión que se debe usar un: <br> <select multiple size="5"><option>Ejemplo</option><option>Ejemplo2</option><option>Ejemplo3</option><option>Ejemplo4</option><option>Ejemplo5</option></select> <br> donde se muestran todas las opciones segun el atributo 'size' y se pueden seleccionar múltiples valores.

- Teniendo en cuanto lo anterior, se añade los elemetos restantes que se ocupan por definición siendo estos: butones, inputs(tipo texto y tipo submit) y los titulos que correspondan.

<br>

## <u>Crear un buen layout para la página</u>
<br>

- Al crear el **index.html** se producieron algunos hallazgos en cuanto al layout de la página ya que no se encontraba la forma de poder ordenar y mostrar de forma clara cada uno de los componentes de la página.

- Se procedio a usar CSS para mantener la forma y orden de la página aún sin importar que no será calificado.

- Una vez el se tiene todos los componentes en orden, se verifica si la página tiene una forma adaptive/responsive para que se puede adaptar a la pantalla de cualquier computador y así no se pierdan elementos de la página.

<br>

## <u>Añadiendo opciones en el tag select</u>

<u>**Este escenario aplica para los dos tags de select. Según definición de la tarea serian los controles 1 y 2.**</u>

<br>

- Una vez se encontro el tag correcto, se tuvo que encontrar la forma de como añadir lo que el usuario ingrese en el input y sea añadido al **select** de las tablas.

- Se recuerda que en la clase POO se uso el attributo 'onclick' para que una vez que se haga click en el botón se ejecute una función de Javascript.

- Se tuvo que hacer busqueda en la documentación de HTML y Javascript para que al momento de obtener el valor del input se pueda hacer uso del **DOM Object** para poder añadir el valor dinámicamente al **select** de las tablas con Javascript.

- Al momento de añadir los valores escritos en el input text se hicieron las siguientes preguntas: 

    <br>

    ### ¿Que pasa si añado espacios en blancos?

        Simplemente se tuvo que impedir que si el input este vacio no se añadiera. Facilmente se puede hacer con un **IF-ELSE**.

    ### ¿Que pasa si añado un texto que ya esta en alguna de las tablas?

        Para esta parte no es necesario ya que cada dato tiene su unique key que fue hecho con un autokey generator.
    
    ### ¿Se tiene que verificar si hay datos antes y despues de añadir valores a los selects?

        La respuesta es: Si.

        Probando sin verificar si hay datos antes o despues simplemente no se añadia, ya que el programa no sabia que hacer y donde añadirlo.

<br>

## <u>Seleccionando valores para pasarlos a las distintas tablas</u>

<u>**Este escenario aplica para los dos botones que se usan para añadir datos y seleccionar para pasar los datos a las respectivas tablas.**</u>
                
    En este caso: '<' y '>' 

<br>

- Se hicieron las verificaciones correspondientes mecionadas anteriormente.

- Se hizo uso de los componentens **DOM Object** para que se añada todo los valores del input al presionar alguno de los dos botones.

- Se tiene que verificar primeramente con una condición si alguna o más opciones esten seleccionadas. 

- Se hizo uso de la consola para poder visualizar los atributos de el elemento 'options' en Javascript, así como lo muestra la siguiente imagen:
    - ![image](https://drive.google.com/uc?id=1BA4q9urJeq2rh1CE63Rn2Bu-Ig9F-ID9)

- Teniendo los atributos podemos visualizar que hay dos atributos que nos interesan y son: **selected** y **value**.

- Con **.selected** podremos saber si alguna de las opciones esta seleccionada.

- Con **.value** podremos tener el valor de las opciones.

- Se hizo uso de un ciclo 'for' para poder tener cada una de las opciones seleccionadas y los valores.

        E.g.:

            for(let i = 0; i<selectObjectTwo.length; i++)
            {
                var selectObjectTwoOption = selectObjectTwo.options[i].selected;
                var selectObjectTwoValue = selectObjectTwo.options[i].value;

                for(let j = 0; j<selectObject.length; j++)
                {
                    var selectObjectValue = selectObject.options[j].value;
                    var selectObjectOption = selectObject.options[j].selected;
                }
            }

- Teniendo en cuenta esto último se empieza a hacer los procedimientos para que una vez que al menos uno o mas opciones esten seleccionadas se pasen a la respectiva tabla.

- Según la definición de la tarea, por ejemplo: los datos de la tabla #1 se deben pasar a la tabla #2, deberia verse reflejado en ambas es decir, se deberian de eliminar de la tabla #1 y estar en la tabla #2.

- Para eso se hizo uso de programación asíncrona. **setTimeout()** hará que todo lo que este dentro de la misma se pase a dicha tabla y después de algunos segundos se eliminaran automáticamente.

- Esto funciona en caso de que hayan elementos o no en esa tabla.

<br>

## <u>Mover todos los valores a las distintas tablas</u>

<u>**Este escenario aplica para los dos botones que se usan para mover datos a las respectivas tablas.**</u>
                
    En este caso: '<<' y '>>' 


<br>

- Para este caso, se recorrio ambos select para obtener sus values.

- Una vez teniendo los values usando **DOM Object** en Javascript se hizo que todo lo que estuviera en, por ejemplo la tabla #1 se pasara a la tabla #2.

- Así como anteriormente se meciono, se hizo el uso de programación asíncrona en este caso haciendo uso de **setTimeOut()**.

<br>

## <u>Eliminar datos de las tablas</u>

<br>

- Para eliminar las opciones se hizo el recorrido de los select con un ciclo 'for' para poder obtener cada uno de las opciones seleccionadas (así como se mostro en la imagen de arriba).

- Una vez teniendo las opciones que estan seleccionadas se hace uso de un ciclo 'while'. Mientras una o más opciones esten seleccionadas se pueden eliminar.

<br>

## <u>Explicación de los Warning Codes</u>

<br>

- **Warning Code#4 y Warning Code#5**:

    - Este warning code se da ya que el boton '<' y '>' no solo tienen la función de mover datos si no también de añadir, al hacer click en el boton no teniendo seleccionado una opción hace que estos warning codes se muestren en consola. Este warning ocurre si y solo si hay al menos uno o más elementos a la tabla contraria que se le añadira el valor.

- **Warning Code#2 y Warning Code#6**:

    - Este warning code se da ya que en el boton '<' y '>' no solo tiene la función de mover datos si no también de añadir, al hacer click en el boton y teniendo el input vacío hacen que estos warning codes se muestren en pantalla. Este warning ocurre si y solo si no hay ningun elemento a la tabla contraria que se le añadira el valor.

- **Warning Code#7 y Warning Code#8**:

    - Este warning code se da ya que al momento de eliminar visualmente una opción del alguno de los dos select se debe realizar una verificación la cual es si alguno de ellos esta seleccionado, si el valor retorna "undefined" en alguno de los dos select se muestra el warning code.



## Definición de la Tarea #1

- Crear un programa de Base de Datos usando IndexDB en Javascript para demostrar los conceptos básicos de inserción, eliminación, actualización y selección de datos. Se adjunta documentación oficial.
    - https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB
    - https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

- Objetivo para el estudiante:

    - Desarrolle una página web con 4 controles: lista de selección múltiple de la izquierda (control 1), lista de selección múltiple de la derecha (control 2), arreglo de botones (control 3), caja de entrada de texto (control 4); que administran dos listas de elementos, cada una como una tabla distinta dentro de una base de datos IndexedDB, donde es posible agregar elementos en una lista, mover elementos (delete, insert) o eliminarlos.

    - Aclaraciones:

        - Las tablas de base de datos (comúnmente llamada base de datos dentro de este documento), tiene una estructura de id y texto.

        - Después de presionar una acción (control 3), se debe reflejar en pantalla el resultado de la acción solicitada (agregar, mover, eliminar). Si se refresca la pantalla, los cambios que existan en la base de datos IndexedDB deben reflejarse en los controles respectivos ya que la información debe ser persistente.

        - El estudiante debe documentar el código con su información de autoría y con las acciones que hace cada componente o código en su tarea.

        - El estudiante puede usar archivos javascript que importa en su index, siempre y cuando todo el código es creado por el estudiante ya que no se admite el uso de frameworks de Javascript. También puede hacer su programa en un único archivo index.html y compreso en 7z según lo solicitado por la tarea.

        - No tiene que aplicar estilos de CSS, sin embargo, puede usarlos pero no tendrán puntuación. La forma general de la tarea la puede realizar usando HTML Tables.

        - No tiene que usar tecnología AJAX o comunicación síncrona MVC, ni componentes Server Side, ya que la tarea hace uso únicamente de Javascript (Client Side).

    - Sobre los controles.
        - El control 1:
            - Representa la tabla 1 de base de datos, es decir, la tabla de base de datos de la izquierda. 

    - El control 2:
        - Representa la tabla 2 de base de datos, es decir, la tabla de base de datos de la derecha.
    
    - El control 3:
        - Botón >: 
            - Cuando uno o varios elementos del control 1 están seleccionados, se mueven los registros desde una tabla de base de datos hacia la otra. La acción final debe verse en el control 1 y 2 (se elimina de una para mover hacia la otra).
            - Cuando existe un texto en el control 4 (aunque existan elementos seleccionados en el control 1), se ejecuta una inserción de un registro sobre la tabla de base de datos del control 2, tomando el texto del control 4. Después de realizada la acción, el control 4 debe quedar limpio y el cambio se debe visualizar en el control 2.

        - Botón < 
            - Cuando uno o varios elementos del control 2 están seleccionados, se mueven los registros desde una tabla de base de datos hacia la otra. La acción final debe verse en el control 2 y 1 (se elimina de una para mover hacia la otra).
            - Cuando existe un texto en el control 4 (aunque existan elementos seleccionados en el control 2), se ejecuta una inserción de un registro sobre la tabla de base de datos del control 1, tomando el texto del control 4. Después de realizada la acción, el control 4 debe quedar limpio y el cambio se debe visualizar en el control 1.

    - Botón >> | <<:
        - Mueve todos los elementos de una tabla de base de datos, hacia la tabla base de datos en la dirección de las “flechas”. 

    - Botón eliminar: permite remover el o los registros seleccionados en una o ambas tablas de base de datos.
    - Botón limpiar: limpia la caja de texto del control 4, sin afectar las tablas de base de datos.

    - El control 4:
        - Caja de texto: contiene un mensaje placeholder por defecto que indica “agregar algún texto”. Cuando se usan el control 3, permite agregar un elemento a una tabla.

    ![image](https://drive.google.com/uc?id=1Ny4yYGgwHzsVl6M_WvCZZlYW8trItVwM)
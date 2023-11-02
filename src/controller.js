import {pool} from './database.js';

class libroController{
    
    //funcionalidad para consulta y ver todos los campos de la tabla
    async getAll(req, res) {
      try {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
      } catch (error) {
        console.log('Error al obtener los libros:', error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
    


    // Funcion para agregar un libro con Try Catch//

    
    async add(req, res) {
      try {
        const libro = req.body;
    
        // Verificar que solo los atributos requeridos estén presentes
        const atributosRequeridos = ['nombre', 'autor', 'categoria', 'añoPublicacion', 'ISBN'];
        const atributosExtra = Object.keys(libro).filter(attr => !atributosRequeridos.includes(attr));
    
        if (atributosExtra.length === 0) {
          const [result] = await pool.query(
            `INSERT INTO libros(nombre, autor, categoria, añoPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)`,
            [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]
          );
    
          if (result.insertId) {
            res.json({ "Id insertado": result.insertId });
          } else {
            res.json({ "error": "Error al ingresar un nuevo libro" });
          }
        } else {
          res.status(400).json({ "error": "Atributos no deseados en el objeto libro: " + atributosExtra.join(', ') });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ "error": "Error en el servidor" });
      }
    }
    

    //Funcion para borrar buscando el id del libro
    async deleteId(req, res) {
      try {
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM libros WHERE id = ?`, [libro.id]);
        res.json({ "Registros eliminados": result.affectedRows });
      } catch (error) {
        console.log('Error al eliminar el libro:', error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
    


    //Funcion para modificar
    async update(req, res) {
  try {
    const libro = req.body;
    const [result] = await pool.query(
      `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, añoPublicacion = ?, ISBN = ? WHERE id = ?`,
      [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]
    );
    
    res.json({ "Registros modificados": result.changedRows });
  } catch (error) {
    console.log('Error al actualizar el libro:', error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}


    //Funcion para buscar por un Id determinado
    async getOne(req, res) {
              
        try {
         const libro = req.parament.id
         const id=parseInt(libro.id);
         const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
          if (result [0]!= undefined) {
            res.json(result);
          } else {
            res.json({"error": "No se encontro libro con el id especificado"}); 
          }
        } catch (e) {
          console.log(e);
    
        }
      } 

      //Funcion para eliminar un libro por ISBN
      async deleteISBN(req, res) {
        try {
          const libro = req.body;
          const ISBN = parseInt(libro.ISBN);
      
          const [result] = await pool.query(`DELETE FROM libros WHERE ISBN = ?`, [ISBN]);
      
          if (result.affectedRows === 0) {
            return res.json({ "error": "No se encontró un libro con el ISBN indicado" });
          } else {
            res.json({ "Registros eliminados": result.affectedRows });
          }
        } catch (e) {
          console.log(e);
          res.status(500).json({ "error": "Error en el servidor" });
        }
      }
      





      
}

export const libro = new libroController();















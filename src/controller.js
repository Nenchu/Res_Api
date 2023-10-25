import {pool} from './database.js';

class libroController{
    
    //funcionalidad para consulta y ver todos los campos de la tabla
    async getAll(req, res){
        const [result]= await pool.query('SELECT * FROM libros');
        res.json(result);
    }


    // Funcion para agregar
    
    async add(req, res) {
      const libro = req.body;
  
      // guarda los atributos validos
      const atributosRequeridos = ['nombre', 'autor', 'categoria', 'añoPublicacion', 'ISBN'];
      //compara los atributos con los de atributosRequeridos
      const atributosExtra = Object.keys(libro).filter(attr => !atributosRequeridos.includes(attr));
  
      try{ 
      if ((atributosExtra.length > 0) || (atributosExtra.length != atributosRequeridos.length)){
        return res.json({ error: `Atributos invalido: ${atributosExtra.join(' , ')} `});
      }
     
        const [result] = await pool.query(
          `INSERT INTO libros(nombre, autor, categoria, añoPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)`,
          [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]
        );
        res.json({ "Id insertado": result.insertId });
      }catch (error) {
      console.log('Error al añadir el libro:', error);
      }
    }









    //Funcion para borrar buscando el id del libro
    async deleteId(req, res){
        const libro = req.body; 
        const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]); 
        res.json({"Registros eliminados": result.affectedRows});
    }
    //Funcion para modificar
    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, libro.id]);
        res.json({"Registros modificados": result.changedRows});

    }
    //Funcion para buscar por un Id determinado
    async getOne(req, res) {
              
        try {
         const libro = req.body
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
      async deleteISBN(req, res){
        const libro = req.body; 
        const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]); 
        res.json({"Registros eliminados": result.affectedRows});
    }






      
}

export const libro = new libroController();















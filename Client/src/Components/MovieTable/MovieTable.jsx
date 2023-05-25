import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieTable.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";




function MovieTable() {
  const [movies, setMovies] = useState([]);
  const [viewedMovieList,setViewedMovieList] = useState([])
  const [viewedList,setViewedList] = useState([])
  const [selectedMovie,setSelectedMovie] = useState(null)


  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);


  
  useEffect(() => {
    axios.get("http://localhost:5000").then((data) => {
      setMovies(data.data);
    });
  }, []);


  const checkAlreadyViewed = (id)=>{
    return new Promise((resolve,reject)=>{
      if(viewedList.includes(id)){
        let movie = viewedMovieList.find(item => item.id === id)
        resolve({status:true,movie})
      }else{
        reject({status:false})
      }
    })
  } 
  

  const getDetails = async(id) => {
    
    checkAlreadyViewed(id).then((data)=>{
      setSelectedMovie(data.movie);
      modalShow()
    }).catch((err)=>{
      axios.get(`http://localhost:5000/movie/${id}`)
      .then((data)=>{
        if(!viewedList.includes(id)){
          setViewedList([...viewedList,data.data.id])
        }
        setViewedMovieList([...viewedMovieList,data.data])
        setSelectedMovie(data.data);
        modalShow()
      })
    })
    
  };

  

  return (
    <div className="OuterBoxTable">
      <div className="OuterBoxSub">
        <Table striped bordered>
          <thead>
            <tr>
              <th>no</th>
              <th>Movie Name</th>
              <th>Year</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{movie.title}</td>
                  <td>{movie.release_date}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => getDetails(movie.id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        
      </div>



      { selectedMovie && <div className="App p-4">
      
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="imageBox">
          <img style={{width:"350px",height:"250px"}} src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`} alt="" />
          </div>
          <p><b>Duration:</b> {selectedMovie.runtime}min</p>
          <p><b>Release:</b> {selectedMovie.release_date}</p>
          <p><b>Language:</b> {selectedMovie.original_language}</p>
          <p><b>Overview:</b> {selectedMovie.overview}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>}



      
    </div>
  );
}

export default MovieTable;

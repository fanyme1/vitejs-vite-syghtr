import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
}

const Exercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
          }
        });
        setExercises(response.data);
        setFilteredExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [apiKey]);

  const handleSearch = () => {
    const filtered = exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="exercises">
      <h2>Exercise Library</h2>
      <input
        type="text"
        placeholder="Search by name, body part, or equipment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="exercise-grid">
        {filteredExercises.map(exercise => (
          <Link to={`/exercise/${exercise.id}`} key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>
            <p>Body Part: {exercise.bodyPart}</p>
            <p>Equipment: {exercise.equipment}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
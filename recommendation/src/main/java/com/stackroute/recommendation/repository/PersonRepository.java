package com.stackroute.recommendation.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.bookservice.domain.Person;
import com.stackroute.recommendation.domain.BookListener;

@Repository
public interface PersonRepository extends Neo4jRepository<Person, Long> {

	@Query("MATCH (m:Person)-[r:likes]->(a:Genre) RETURN m,r,a")
	public List<Person> getAllPersons();

	@Query("MATCH (m:Book)-[r:writtenBy]->(a:Author) RETURN m,r,a")
	public List<BookListener> getAllBooks();

	@Query("MATCH (m:Book) WHERE m.rating>5 RETURN m")
	public List<BookListener> getAllBooksByRating();

}

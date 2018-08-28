package com.stackroute.recommendation.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.recommendation.domain.BookListener;
import com.stackroute.userprofile.domain.UserProfile;

@Repository
public interface PersonRepository extends Neo4jRepository<UserProfile, Long> {

//	@Query("MATCH (m:Person)-[r:likes]->(a:Genre) RETURN m,r,a")
//	public List<UserProfile> getAllPersons();
//
//	@Query("MATCH (m:Book)-[r:writtenBy]->(a:Author) RETURN m,r,a")
//	public List<BookListener> getAllBooks();
//
	@Query("MATCH (m:BookListener) WHERE m.rating>'10' RETURN m")
	public List<BookListener> getAllBooksByRating();

}

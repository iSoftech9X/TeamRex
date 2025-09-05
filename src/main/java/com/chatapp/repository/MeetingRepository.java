package com.chatapp.repository;

import com.chatapp.model.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MeetingRepository extends MongoRepository<Meeting, String> {
 }

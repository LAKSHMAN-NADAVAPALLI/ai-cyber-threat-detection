package com.cybersecurity.backend;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "threat_data")
public class ThreatData {

    @Id
    private String id;

    private String inputText;
    private String threatLevel; // e.g., "Low", "Medium", "High"
    private String analysisResult;

    private LocalDateTime timestamp;

    // Constructors
    public ThreatData() {}

    public ThreatData(String inputText, String threatLevel, String analysisResult, LocalDateTime timestamp) {
        this.inputText = inputText;
        this.threatLevel = threatLevel;
        this.analysisResult = analysisResult;
        this.timestamp = timestamp;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInputText() {
        return inputText;
    }

    public void setInputText(String inputText) {
        this.inputText = inputText;
    }

    public String getThreatLevel() {
        return threatLevel;
    }

    public void setThreatLevel(String threatLevel) {
        this.threatLevel = threatLevel;
    }

    public String getAnalysisResult() {
        return analysisResult;
    }

    public void setAnalysisResult(String analysisResult) {
        this.analysisResult = analysisResult;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

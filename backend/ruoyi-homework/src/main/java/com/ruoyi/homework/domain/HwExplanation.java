package com.ruoyi.homework.domain;

import com.ruoyi.common.core.domain.BaseEntity;

import java.util.List;
import java.util.Map;

public class HwExplanation extends BaseEntity {
    private Long id;
    private Long questionId;
    private String analysis;
    private List<Map<String, Object>> steps;
    private List<String> keyPoints;
    private String tips;
    private String similarQuestions;
    private String aiModel;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }
    public String getAnalysis() { return analysis; }
    public void setAnalysis(String analysis) { this.analysis = analysis; }
    public List<Map<String, Object>> getSteps() { return steps; }
    public void setSteps(List<Map<String, Object>> steps) { this.steps = steps; }
    public List<String> getKeyPoints() { return keyPoints; }
    public void setKeyPoints(List<String> keyPoints) { this.keyPoints = keyPoints; }
    public String getTips() { return tips; }
    public void setTips(String tips) { this.tips = tips; }
    public String getSimilarQuestions() { return similarQuestions; }
    public void setSimilarQuestions(String similarQuestions) { this.similarQuestions = similarQuestions; }
    public String getAiModel() { return aiModel; }
    public void setAiModel(String aiModel) { this.aiModel = aiModel; }
}
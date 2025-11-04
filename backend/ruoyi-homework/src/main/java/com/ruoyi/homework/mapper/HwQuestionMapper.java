package com.ruoyi.homework.mapper;

import com.ruoyi.homework.domain.HwQuestion;
import com.ruoyi.homework.domain.HwExplanation;
import java.util.List;

public interface HwQuestionMapper {
    List<HwQuestion> selectQuestionList(HwQuestion filter);
    HwQuestion selectQuestionById(Long id);
    int insertQuestion(HwQuestion question);
    int updateQuestion(HwQuestion question);
    int deleteQuestionById(Long id);
    HwExplanation selectExplanationByQuestionId(Long questionId);
    int insertExplanation(HwExplanation explanation);
}
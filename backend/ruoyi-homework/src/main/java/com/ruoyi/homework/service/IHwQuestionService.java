package com.ruoyi.homework.service;

import com.ruoyi.homework.domain.HwQuestion;
import com.ruoyi.homework.domain.HwExplanation;
import java.util.List;

public interface IHwQuestionService {
    List<HwQuestion> selectQuestionList(HwQuestion filter);
    HwQuestion selectQuestionById(Long id);
    int insertQuestion(HwQuestion question, HwExplanation explanation);
    int updateQuestion(HwQuestion question);
    int deleteQuestion(Long id);
}
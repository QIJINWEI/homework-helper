package com.ruoyi.homework.service.impl;

import com.ruoyi.homework.domain.HwQuestion;
import com.ruoyi.homework.domain.HwExplanation;
import com.ruoyi.homework.mapper.HwQuestionMapper;
import com.ruoyi.homework.service.IHwQuestionService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;

@Service
public class HwQuestionServiceImpl implements IHwQuestionService {
    @Resource
    private HwQuestionMapper hwQuestionMapper;

    @Override
    public List<HwQuestion> selectQuestionList(HwQuestion filter) {
        List<HwQuestion> list = hwQuestionMapper.selectQuestionList(filter);
        for (HwQuestion q : list) {
            HwExplanation exp = hwQuestionMapper.selectExplanationByQuestionId(q.getId());
            if (exp != null) { q.setExplanation(exp); }
        }
        return list;
    }

    @Override
    public HwQuestion selectQuestionById(Long id) {
        HwQuestion question = hwQuestionMapper.selectQuestionById(id);
        if (question != null) {
            HwExplanation exp = hwQuestionMapper.selectExplanationByQuestionId(id);
            question.setExplanation(exp);
        }
        return question;
    }

    @Override
    public int insertQuestion(HwQuestion question, HwExplanation explanation) {
        int rows = hwQuestionMapper.insertQuestion(question);
        if (rows > 0 && explanation != null) {
            explanation.setQuestionId(question.getId());
            hwQuestionMapper.insertExplanation(explanation);
        }
        return rows;
    }

    @Override
    public int updateQuestion(HwQuestion question) { return hwQuestionMapper.updateQuestion(question); }

    @Override
    public int deleteQuestion(Long id) { return hwQuestionMapper.deleteQuestionById(id); }
}
package com.ruoyi.homework.controller;

import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.homework.domain.HwQuestion;
import com.ruoyi.homework.domain.HwExplanation;
import com.ruoyi.homework.service.IHwQuestionService;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class HwQuestionController extends BaseController {
    @Resource
    private IHwQuestionService hwQuestionService;

    @GetMapping
    public TableDataInfo list(HwQuestion filter) {
        startPage();
        List<HwQuestion> list = hwQuestionService.selectQuestionList(filter);
        return getDataTable(list);
    }

    @GetMapping("/{id}")
    public AjaxResult get(@PathVariable Long id) {
        HwQuestion question = hwQuestionService.selectQuestionById(id);
        return AjaxResult.success(question);
    }

    @Log(title = "题目新增", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody HwQuestion question) {
        HwExplanation explanation = question.getExplanation();
        int rows = hwQuestionService.insertQuestion(question, explanation);
        return rows > 0 ? AjaxResult.success(question) : AjaxResult.error("新增失败");
    }

    @Log(title = "题目修改", businessType = BusinessType.UPDATE)
    @PutMapping("/{id}")
    public AjaxResult edit(@PathVariable Long id, @RequestBody HwQuestion question) {
        question.setId(id);
        int rows = hwQuestionService.updateQuestion(question);
        return rows > 0 ? AjaxResult.success() : AjaxResult.error("修改失败");
    }

    @Log(title = "题目删除", businessType = BusinessType.DELETE)
    @DeleteMapping("/{id}")
    public AjaxResult remove(@PathVariable Long id) {
        int rows = hwQuestionService.deleteQuestion(id);
        return rows > 0 ? AjaxResult.success() : AjaxResult.error("删除失败");
    }
}
package com.ruoyi.homework.controller;

import com.ruoyi.common.core.domain.AjaxResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {
    @PostMapping("/recognize")
    public AjaxResult recognize(@RequestBody Map<String, Object> body) {
        String imageUrl = (String) body.get("imageUrl");
        String rawText = "已识别示例题目：1. 下列关于Java的说法正确的是？ A. Java是纯函数式语言 B. Java支持面向对象 C. Java不能跨平台 D. Java没有虚拟机 答案: B";
        Map<String, Object> parsed = new HashMap<>();
        parsed.put("type", "single");
        parsed.put("question", "下列关于Java的说法正确的是？");
        Map<String, String> options = new HashMap<>();
        options.put("A", "Java是纯函数式语言");
        options.put("B", "Java支持面向对象");
        options.put("C", "Java不能跨平台");
        options.put("D", "Java没有虚拟机");
        parsed.put("options", options);
        parsed.put("answer", "B");
        Map<String, Object> result = new HashMap<>();
        result.put("rawText", rawText);
        result.put("parsed", parsed);
        result.put("confidence", 0.95);
        return AjaxResult.success(result);
    }
}
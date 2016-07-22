---
---

$(document).ready(function() {

    var re_A = /A:/;
    var re_eq = /[=]:/;

    $(".quizzer").each(function(i,obj) {
        var qspec = $(this).html();
        var qspec_lines = qspec.split(/\s+[A=]:/);
        qspec_lines = qspec_lines.map(function(s) { return s.trim(); });
        console.log(qspec_lines);
        var tag = "_q_" + i;
        var html = "<p>" + qspec_lines[0] + "</p>";
        html += "<ul style=\"list-style: none;\">";
        for (var i = 1; i < qspec_lines.length; i += 2) {
            var answer = qspec_lines[i];
            var reply = qspec_lines[i+1];
            html += "<li>";
            html += "<input type=\"radio\"";
            html += " name=\"" + tag + "\"";
            html += " id=\"" + tag + "_" + i + "\"";
            html += " value=\"" + reply + "\">";
            html += "<label for=\"" + tag + "_" + i + "\">";
            html += answer;
            html += "</label>";
            html += "</li>";
        }
        html += "</ul>";
        html += "<p id=\"" + tag + "Result\"></p>";
        console.log(html);
        $(this).replaceWith(html);
    });

    $("input:radio").click(function() {
        $('#' + this.name + 'Result').text(this.value);
    });
});

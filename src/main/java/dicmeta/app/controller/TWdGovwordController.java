package dicmeta.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.annotations.Api;

/**
 * @description : 데이터사전 화면 호출
 * @author 박이정
 * @since 2021.02.10
 * <pre>
 *  수정일             수정자              수정내용
 *  ----------  --------    ---------------------------
 *  2019.09.02  박이정             최초 생성
 * </pre>
 */
@Controller
public class TWdGovwordController {

	@GetMapping("/govword_list")
	public String govword_list() throws Exception {
		return "govword_list";
	}
	@GetMapping("/govword_edit")
	public String govword_edit() throws Exception {
		return "govword_edit";
	}
}

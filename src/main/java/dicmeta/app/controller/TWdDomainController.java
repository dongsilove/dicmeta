package dicmeta.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @description : 데이터사전 화면 호출
 * @author 박이정
 * @since 2021.02.10
 * <pre>
 *  수정일        수정자        수정내용
 *  ----------  --------    ---------------------------
 *  2021.02.10   박이정        최초 생성
 * </pre>
 */
@Controller
public class TWdDomainController {

	@GetMapping("/domain_list")
	public String domain_list() throws Exception {
		return "domain_list";
	}
	@GetMapping("/domain_edit")
	public String domain_edit() throws Exception {
		return "domain_edit";
	}
}

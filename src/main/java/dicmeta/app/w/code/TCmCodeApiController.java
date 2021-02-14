package dicmeta.app.w.code;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag( name = "TCmCodeApiController", description = "코드")
@RestController
public class TCmCodeApiController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	TCmCodeRepository codeRepository;

	@Operation(summary = "코드 목록 조회", description = "검색 값으로 페이징된 코드 목록 화면을 호출한다.")
	@GetMapping("/codes")
	public Page<TCmCode> list( @RequestParam Map<String,Object> param,
			@RequestParam(name = "perPage", required = true, defaultValue = "20") int perPage,
			@RequestParam(name = "page", required = true, defaultValue = "1") int page) throws Exception {
		Page<TCmCode> list;
		param.forEach((k,v)->logger.debug("key:" + k + "\tvalue:" +v));
		//PageRequest pageRequest = PageRequest.of(page - 1, perPage); // , new Sort(Direction.ASC, "ordr"
		Pageable pageable =  PageRequest.of(page - 1, perPage);
		//if(param.get("wordNm") != null && param.get("wordNm").toString() != null) {
		//	//list = (Page<TCmCode>) codeRepository.findByWordNmContaining(param.get("wordNm").toString(), pageable);
		//} else {
			list = (Page<TCmCode>) codeRepository.findAll(PageRequest.of(page - 1, perPage));
		//}
		return list;
	}
	
	@Operation(summary = "코드 조회", description = "단건 조회한다.")
	@GetMapping("/codes/{grpCd}/{cd}")
	public Optional<TCmCode> get( @PathVariable String grpCd, @PathVariable String cd) throws Exception {

		Optional<TCmCode> code = codeRepository.findByGrpCdAndCd(grpCd, cd);
		
		return code;
		
	}
	
	@Operation(summary = "select 코드 목록 조회", description = "그룹코드값으로 코드 목록을 조회한다.")
	@GetMapping("/common/codes/{grpCd}")
	public List<TCmCode> common_list( @RequestParam(required = true) String grpCd) throws Exception {
		List<TCmCode> list;
		logger.debug("grpCd:" + grpCd);
		list = codeRepository.findByGrpCd(grpCd);
		return list;
		
	}	
}

package dicmeta.app.w.domain;

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


import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag( name = "TWdDomainRestController", description = "도메인")
@RestController
public class TWdDomainApiController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	TWdDomainRepository domainRepository;

	@Operation(summary = "도메인 목록 조회", description = "검색 값으로 페이징된 도메인 목록 화면을 호출한다.")
	@GetMapping("/domains")
	public Page<TWdDomain> list( @RequestParam Map<String,Object> param,
			@RequestParam(name = "perPage", required = true, defaultValue = "20") int perPage,
			@RequestParam(name = "page", required = true, defaultValue = "1") int page) throws Exception {
		Page<TWdDomain> list;
		param.forEach((k,v)->logger.debug("key:" + k + "\tvalue:" +v));
		//PageRequest pageRequest = PageRequest.of(page - 1, perPage); // , new Sort(Direction.ASC, "ordr"
		Pageable pageable =  PageRequest.of(page - 1, perPage);
		//if(param.get("wordNm") != null && param.get("wordNm").toString() != null) {
		//	//list = (Page<TWdDomain>) domainRepository.findByWordNmContaining(param.get("wordNm").toString(), pageable);
		//} else {
			list = (Page<TWdDomain>) domainRepository.findAll(PageRequest.of(page - 1, perPage));
		//}
		return list;
		
	}
	
	@Operation(summary = "도메인 조회", description = "도메인 단건 조회한다.")
	@GetMapping("/domains/{domainSn}")
	public Optional<TWdDomain> get( @PathVariable Integer domainSn) throws Exception {

		Optional<TWdDomain> domain = domainRepository.findById(domainSn);
		
		return domain;
		
	}
	
	
}

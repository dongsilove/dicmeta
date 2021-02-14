package dicmeta.app.w.govword;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TWdGovwordApiController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	TWdGovwordRepository govwordRepository;

	@GetMapping("/govwords")
	public Page<TWdGovword> list( @RequestParam Map<String,Object> param,
			@RequestParam(name = "perPage", required = true, defaultValue = "20") int perPage,
			@RequestParam(name = "page", required = true, defaultValue = "1") int page) throws Exception {
		Page<TWdGovword> list;
		param.forEach((k,v)->logger.debug("key:" + k + "\tvalue:" +v));
		//PageRequest pageRequest = PageRequest.of(page - 1, perPage); // , new Sort(Direction.ASC, "ordr"
		Pageable pageable =  PageRequest.of(page - 1, perPage);
		if(param.get("wordNm") != null && param.get("wordNm").toString() != null) {
			list = (Page<TWdGovword>) govwordRepository.findByWordNmContaining(param.get("wordNm").toString(), pageable);
		} else {
			list = (Page<TWdGovword>) govwordRepository.findAll(PageRequest.of(page - 1, perPage));
		}
		return list;
		
	}
	
	
}

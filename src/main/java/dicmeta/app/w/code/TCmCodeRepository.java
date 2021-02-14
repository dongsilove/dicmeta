package dicmeta.app.w.code;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TCmCodeRepository extends JpaRepository<TCmCode, Integer> {

	// 단건 조회
	Optional<TCmCode> findByGrpCdAndCd(String grpCd,String cd);
	
	// 공통 목록 조회
	List<TCmCode> findByGrpCd(String grpCd);
	
}

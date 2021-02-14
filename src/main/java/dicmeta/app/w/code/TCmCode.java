package dicmeta.app.w.code;

import java.io.Serializable;
import javax.persistence.*;

import dicmeta.app.common.CommonTbl;
import io.swagger.annotations.ApiModelProperty;


/**
 * The persistent class for the t_cm_code database table.
 * 
 */
@Entity
@IdClass(TCmCodePK.class)
@Table(name="t_cm_code")
@NamedQuery(name="TCmCode.findAll", query="SELECT t FROM TCmCode t")
public class TCmCode extends CommonTbl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@ApiModelProperty(value = "그룹코드")
	@Column(name = "GRP_CD")
	private String grpCd;
	
	@Id	
	@ApiModelProperty(value = "코드")
	@Column(name = "CD")
	private String cd;

	@Column(name="cd_nm")
	private String cdNm;

	public TCmCode() {
	}


	public String getCdNm() {
		return this.cdNm;
	}

	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}


	public String getGrpCd() {
		return grpCd;
	}


	public void setGrpCd(String grpCd) {
		this.grpCd = grpCd;
	}


	public String getCd() {
		return cd;
	}


	public void setCd(String cd) {
		this.cd = cd;
	}

	
}
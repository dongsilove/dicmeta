package dicmeta.app.w.code;

import java.io.Serializable;
import javax.persistence.*;

import dicmeta.app.common.CommonTbl;


/**
 * The persistent class for the t_cm_code database table.
 * 
 */
@Entity
@Table(name="t_cm_code")
@NamedQuery(name="TCmCode.findAll", query="SELECT t FROM TCmCode t")
public class TCmCode extends CommonTbl implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private TCmCodePK id;

	@Column(name="cd_nm")
	private String cdNm;

	public TCmCode() {
	}

	public TCmCodePK getId() {
		return this.id;
	}

	public void setId(TCmCodePK id) {
		this.id = id;
	}

	public String getCdNm() {
		return this.cdNm;
	}

	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}

}
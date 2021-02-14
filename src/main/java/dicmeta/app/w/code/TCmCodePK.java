package dicmeta.app.w.code;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the t_cm_code database table.
 * 
 */
@Entity
public class TCmCodePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "GRP_CD")
	private String grpCd;
	
	@Id	
	@Column(name = "CD")
	private String cd;

	public TCmCodePK() {
	}
	public String getGrpCd() {
		return this.grpCd;
	}
	public void setGrpCd(String grpCd) {
		this.grpCd = grpCd;
	}
	public String getCd() {
		return this.cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}


}
package dicmeta.app.w.code;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the t_cm_code database table.
 * 
 */
@Embeddable
public class TCmCodePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="grp_cd")
	private String grpCd;

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

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof TCmCodePK)) {
			return false;
		}
		TCmCodePK castOther = (TCmCodePK)other;
		return 
			this.grpCd.equals(castOther.grpCd)
			&& this.cd.equals(castOther.cd);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.grpCd.hashCode();
		hash = hash * prime + this.cd.hashCode();
		
		return hash;
	}
}
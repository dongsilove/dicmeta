package dicmeta.app.w.govword;

import java.io.Serializable;
import javax.persistence.*;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;


/**
 * The persistent class for the t_wd_govword database table.
 * 
 */
@Entity
@Table(name="t_wd_govword")
@NamedQuery(name="TWdGovword.findAll", query="SELECT t FROM TWdGovword t")
public class TWdGovword implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="T_WD_GOVWORD_WORDSN_GENERATOR", sequenceName="T_WD_GOVWORD_WORD_SN_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="T_WD_GOVWORD_WORDSN_GENERATOR")
	@Column(name="word_sn", unique=true, nullable=false)
	@Schema(description ="단어 일련번호" )
	private Integer wordSn;

	@Column(name="modify_id", length=50)
	@Schema(description ="수정 아이디" )
	private String modifyId;

	@Temporal(TemporalType.DATE)
	@Column(name="modify_ymd")
	@Schema(description ="수정 일자" )
	private Date modifyYmd;

	@Column(name="regist_id", length=50)
	@Schema(description ="등록 아이디" )
	private String registId;

	@Temporal(TemporalType.DATE)
	@Column(name="regist_ymd")
	@Schema(description ="등록 일자" )
	private Date registYmd;

	@Column(name="sttus_se", length=100)
	@Schema(description ="상태 구분" )
	private String sttusSe;

	@Column(name="thema_se", length=200)
	@Schema(description ="주제 구분" )
	private String themaSe;

	@Column(name="word_dc", length=40000)
	@Schema(description ="단어 설명" )
	private String wordDc;

	@Column(name="word_en_abbr", length=100)
	@Schema(description ="단어 영문 약어" )
	private String wordEnAbbr;

	@Column(name="word_en_nm", length=200)
	@Schema(description ="단어 영문 명" )
	private String wordEnNm;

	@Column(name="word_nm", length=200)
	@Schema(description ="단어 명" )
	private String wordNm;

	@Column(name="word_se", length=10)
	@Schema(description ="단어 구분" )
	private String wordSe;

	public TWdGovword() {
	}

	public Integer getWordSn() {
		return this.wordSn;
	}

	public void setWordSn(Integer wordSn) {
		this.wordSn = wordSn;
	}

	public String getModifyId() {
		return this.modifyId;
	}

	public void setModifyId(String modifyId) {
		this.modifyId = modifyId;
	}

	public Date getModifyYmd() {
		return this.modifyYmd;
	}

	public void setModifyYmd(Date modifyYmd) {
		this.modifyYmd = modifyYmd;
	}

	public String getRegistId() {
		return this.registId;
	}

	public void setRegistId(String registId) {
		this.registId = registId;
	}

	public Date getRegistYmd() {
		return this.registYmd;
	}

	public void setRegistYmd(Date registYmd) {
		this.registYmd = registYmd;
	}

	public String getSttusSe() {
		return this.sttusSe;
	}

	public void setSttusSe(String sttusSe) {
		this.sttusSe = sttusSe;
	}

	public String getThemaSe() {
		return this.themaSe;
	}

	public void setThemaSe(String themaSe) {
		this.themaSe = themaSe;
	}

	public String getWordDc() {
		return wordDc;
	}

	public void setWordDc(String wordDc) {
		this.wordDc = wordDc;
	}

	public String getWordEnAbbr() {
		return this.wordEnAbbr;
	}

	public void setWordEnAbbr(String wordEnAbbr) {
		this.wordEnAbbr = wordEnAbbr;
	}

	public String getWordEnNm() {
		return this.wordEnNm;
	}

	public void setWordEnNm(String wordEnNm) {
		this.wordEnNm = wordEnNm;
	}

	public String getWordNm() {
		return this.wordNm;
	}

	public void setWordNm(String wordNm) {
		this.wordNm = wordNm;
	}

	public String getWordSe() {
		return this.wordSe;
	}

	public void setWordSe(String wordSe) {
		this.wordSe = wordSe;
	}

}
package dicmeta.app.w.domain;

import java.io.Serializable;
import javax.persistence.*;

import dicmeta.app.common.CommonTbl;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_wd_domain database table.
 * 
 */
@Entity
@Table(name="t_wd_domain")
@NamedQuery(name="TWdDomain.findAll", query="SELECT t FROM TWdDomain t")
public class TWdDomain extends CommonTbl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="T_WD_DOMAIN_DOMAINSN_GENERATOR", sequenceName="T_WD_WORD_WORD_SN_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.AUTO, generator="T_WD_DOMAIN_DOMAINSN_GENERATOR")
	@Column(name="domain_sn")
	@Schema(description ="도메인 일련번호" )
	private Integer domainSn;

	@Column(name="data_lt")
	@Schema(description ="데이터 길이" )
	private BigDecimal dataLt;

	@Column(name="data_type")
	@Schema(description ="데이터 타입" )
	private String dataType;

	@Column(name="dcmlpoint_lt")
	@Schema(description ="소수점 길이" )
	private BigDecimal dcmlpointLt;

	@Column(name="domain_cl")
	@Schema(description ="도메인 분류" )
	private String domainCl;

	@Column(name="domain_dc")
	@Schema(description ="도메인 설명" )
	private String domainDc;

	@Column(name="domain_en_abbr")
	@Schema(description ="도메인 영문 약어" )
	private String domainEnAbbr;

	@Column(name="domain_en_nm")
	@Schema(description ="도메인 영문 명" )
	private String domainEnNm;

	@Column(name="domain_exprsn_nm")
	@Schema(description ="도메인 표현 명" )
	private String domainExprsnNm;
	
	@Column(name="domain_nm")
	@Schema(description ="도메인 명" )
	private String domainNm;

	@Column(name="exprsn_fom")
	@Schema(description ="표현 형식" )
	private String exprsnFom;

	@Column(name="perm_val_dc")
	@Schema(description ="허용 값 설명" )
	private String permValDc;

	@Schema(description ="단위" )
	private String unit;

	public TWdDomain() {
	}

	public Integer getDomainSn() {
		return this.domainSn;
	}

	public void setDomainSn(Integer domainSn) {
		this.domainSn = domainSn;
	}

	public BigDecimal getDataLt() {
		return this.dataLt;
	}

	public void setDataLt(BigDecimal dataLt) {
		this.dataLt = dataLt;
	}

	public String getDataType() {
		return this.dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public BigDecimal getDcmlpointLt() {
		return this.dcmlpointLt;
	}

	public void setDcmlpointLt(BigDecimal dcmlpointLt) {
		this.dcmlpointLt = dcmlpointLt;
	}

	public String getDomainCl() {
		return this.domainCl;
	}

	public void setDomainCl(String domainCl) {
		this.domainCl = domainCl;
	}

	public String getDomainDc() {
		return this.domainDc;
	}

	public void setDomainDc(String domainDc) {
		this.domainDc = domainDc;
	}

	public String getDomainEnAbbr() {
		return this.domainEnAbbr;
	}

	public void setDomainEnAbbr(String domainEnAbbr) {
		this.domainEnAbbr = domainEnAbbr;
	}

	public String getDomainEnNm() {
		return this.domainEnNm;
	}

	public void setDomainEnNm(String domainEnNm) {
		this.domainEnNm = domainEnNm;
	}

	public String getDomainExprsnNm() {
		return domainExprsnNm;
	}

	public void setDomainExprsnNm(String domainExprsnNm) {
		this.domainExprsnNm = domainExprsnNm;
	}

	public String getDomainNm() {
		return this.domainNm;
	}

	public void setDomainNm(String domainNm) {
		this.domainNm = domainNm;
	}

	public String getExprsnFom() {
		return this.exprsnFom;
	}

	public void setExprsnFom(String exprsnFom) {
		this.exprsnFom = exprsnFom;
	}

	public Date getModifyDt() {
		return this.modifyDt;
	}

	public void setModifyDt(Date modifyDt) {
		this.modifyDt = modifyDt;
	}

	public String getModifyId() {
		return this.modifyId;
	}

	public void setModifyId(String modifyId) {
		this.modifyId = modifyId;
	}

	public String getPermValDc() {
		return this.permValDc;
	}

	public void setPermValDc(String permValDc) {
		this.permValDc = permValDc;
	}

	public Date getRegistDt() {
		return this.registDt;
	}

	public void setRegistDt(Date registDt) {
		this.registDt = registDt;
	}

	public String getRegistId() {
		return this.registId;
	}

	public void setRegistId(String registId) {
		this.registId = registId;
	}

	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

}
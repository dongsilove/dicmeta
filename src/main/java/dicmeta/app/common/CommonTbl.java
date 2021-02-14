package dicmeta.app.common;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter @Setter
public abstract class CommonTbl {
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="regist_dt",insertable=false, updatable=false, columnDefinition="timestamp DEFAULT CURRENT_TIMESTAMP")
	@Schema(description ="등록 일시" )
	protected Date registDt;

	@Column(name="regist_id", length=50)
	@Schema(description ="등록 아이디" )
	protected String registId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_dt")
	@Schema(description ="수정 일시" )
	protected Date modifyDt;

	@Column(name="modify_id", length=50)
	@Schema(description ="수정 아이디" )
	protected String modifyId;

	////@ApiModelProperty(value = "생성자")
	//@Column(name = "REG_ID")
	////@CreatedBy
	//protected String regId;
	//
	////@ApiModelProperty(value = "생성일")
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	//@CreationTimestamp
	//@Column(name = "REG_DT")
	//protected LocalDateTime  regDt;
	//
	////@ApiModelProperty(value = "수정자")
	//@Column(name = "UPD_ID", nullable=true)
	////@LastModifiedBy
	//protected String updId;
	//
	////@ApiModelProperty(value = "수정일")
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	//@UpdateTimestamp
	//@Column(name = "UPD_DT", nullable=true)
	//protected LocalDateTime  updDt;
}

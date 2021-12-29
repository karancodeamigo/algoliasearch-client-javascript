package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** TimeRange */
public class TimeRange {

  public static final String SERIALIZED_NAME_FROM = "from";

  @SerializedName(SERIALIZED_NAME_FROM)
  private Integer from;

  public static final String SERIALIZED_NAME_UNTIL = "until";

  @SerializedName(SERIALIZED_NAME_UNTIL)
  private Integer until;

  public TimeRange from(Integer from) {
    this.from = from;
    return this;
  }

  /**
   * Lower bound of the time range (Unix timestamp).
   *
   * @return from
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Lower bound of the time range (Unix timestamp)."
  )
  public Integer getFrom() {
    return from;
  }

  public void setFrom(Integer from) {
    this.from = from;
  }

  public TimeRange until(Integer until) {
    this.until = until;
    return this;
  }

  /**
   * Upper bound of the time range (Unix timestamp).
   *
   * @return until
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Upper bound of the time range (Unix timestamp)."
  )
  public Integer getUntil() {
    return until;
  }

  public void setUntil(Integer until) {
    this.until = until;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TimeRange timeRange = (TimeRange) o;
    return (
      Objects.equals(this.from, timeRange.from) &&
      Objects.equals(this.until, timeRange.until)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(from, until);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TimeRange {\n");
    sb.append("    from: ").append(toIndentedString(from)).append("\n");
    sb.append("    until: ").append(toIndentedString(until)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
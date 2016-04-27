package org.openhs.core.commons;

public enum StringIdent {
	
	NOT_VALID("--"),
	TEST ("test");
	

    private String value;

	StringIdent(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.getValue();
    }	

}
